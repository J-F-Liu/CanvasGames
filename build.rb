require 'fileutils'

def get_typescript_files(dir)
  scripts = []
  Dir.entries(dir).each do |entry|
    if entry == '.' or entry == '..'
      next
    end
    file = File.join(dir, entry)
    if File.directory? file
      scripts += get_typescript_files(file)
    elsif file.end_with?('.ts')
      scripts << file
    end
  end
  scripts
end

def build_typescript_library(srcdir, outfile)
  scripts = get_typescript_files(srcdir)
  command = "tsc -t ES5 -d --out #{outfile} #{scripts.join(' ')}"
  puts command
  system(command)
end

def build_typescript_application(srcdir, libdef, outfile)
  scripts = get_typescript_files(srcdir)
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
  build_typescript_library("GameEngine", "out/GameEngine.js")
  build_typescript_application(name, "out/GameEngine.d.ts", "out/#{name}/GameWorld.js")
  copy_file_if_newer("out/GameEngine.js", "out/#{name}/GameEngine.js")
  copy_file_if_newer("LAB.min.js", "out/LAB.min.js")
  copy_content_files(name, "out/#{name}")
  modify_html_file("out/#{name}/index.html")
end

build_game("Painter")