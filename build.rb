require 'fileutils'

def get_typescript_files(name)
  engine_scripts = []
  game_scripts = []
  html = File.read("#{name}/index.html", encoding: "utf-8")
  html.lines.each do |line|
    if match = /\.script\(\"(?<file>[^"]+)\"\)\.wait/.match(line.strip)
      file = match[:file].sub(/\.js$/, '.ts')
      if file.start_with? '../GameEngine/'
        engine_scripts << file.slice(3..-1)
      else
        game_scripts << File.join(name, file)
      end
    end
  end
  return engine_scripts, game_scripts
end

def build_typescript_library(scripts, outfile)
  command = "tsc -t ES5 -d --out #{outfile} #{scripts.join(' ')}"
  puts command
  system(command)
end

def build_typescript_application(scripts, libdef, outfile)
  command = "tsc -t ES5 --out #{outfile} #{libdef} #{scripts.join(' ')}"
  puts command
  system(command)
end

def copy_content_files(srcdir, destdir)
  if not Dir.exist?(destdir)
    Dir.mkdir(destdir)
  end
  Dir.entries(srcdir).each do |entry|
    if entry == '.' or entry == '..'
      next
    end
    srcPath = File.join(srcdir, entry)
    destPath = File.join(destdir, entry)
    if File.directory? srcPath
      copy_content_files(srcPath, destPath)
    elsif srcPath.end_with?('.css', '.html', '.png', '.jpg', '.mp3', '.ogg')
      copy_file_if_newer(srcPath, destPath)
    end
  end
end

def copy_file_if_newer(srcfile, destfile)
  if File.exist?(destfile)
    if File.size(srcfile) == File.size(destfile) and File.mtime(srcfile) == File.mtime(destfile)
      return
    else
      File.delete(destfile)
   end
 end
 puts "copy #{srcfile} #{destfile}"
 FileUtils.copy_file(srcfile, destfile)
 FileUtils.touch(destfile, :mtime => File.mtime(srcfile))
end

def modify_html_file(file)
  puts "modify #{file}"
  html = File.read(file, encoding: "utf-8")
  html.gsub!(/^\s+\.script.*wait\(\)\s*\n/, "")
  html.gsub!(/\$LAB/, "$LAB.script(\"GameEngine.js\").wait()")
  File.write(file, html)
end

def build_game(name)
  engine_scripts, game_scripts = get_typescript_files(name)
  build_typescript_library(engine_scripts, "out/GameEngine.js")
  build_typescript_application(game_scripts, "out/GameEngine.d.ts", "out/#{name}/GameWorld.js")
  copy_file_if_newer("out/GameEngine.js", "out/#{name}/GameEngine.js")
  copy_file_if_newer("LAB.min.js", "out/LAB.min.js")
  copy_content_files(name, "out/#{name}")
  modify_html_file("out/#{name}/index.html")
end

if ARGV.count > 0
  game_name = ARGV.first
  build_game(game_name)
  system("open", "out/#{game_name}/index.html")
else
  Dir.entries('.').each do |entry|
    if entry == '.' or entry == '..'
      next
    end
    if File.directory? entry and File.exist? File.join(entry, "index.html")
      puts "build #{entry}"
      build_game(entry)
    end
  end
end