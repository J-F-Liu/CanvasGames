def get_file_names(dir)
  files = []
  Dir.entries(dir).each do |entry|
    if entry == '.' or entry == '..' or entry == ".DS_Store"
      next
    end
    path = File.join(dir, entry)
    if File.file? path
      files << entry
    end
  end
  files
end

def gen_image_load(game_name)
  images = get_file_names("#{game_name}/image")
  puts "Game.loadImages(\"image/\","
  puts images.collect{|name|"\"#{name}\""}.join(", ")
  puts ");"
end

def gen_audio_load(game_name)
  audios = get_file_names("#{game_name}/audio")
  print "Game.loadAudios(\"audio/\","
  print audios.collect{|name|"\"#{File.basename(name, '.*')}\""}.uniq.join(", ")
  puts ");"
end

def rotate_text_array(array)
  result = []
  rows = array.length
  cols = array[0].length
  for col in 1..cols
    text = ""
    for row in 0..rows-1
      text += array[row][-col]
    end
    result << text
  end
  result
end

if ARGV.count > 0
  game_name = ARGV.first
  gen_image_load(game_name)
  gen_audio_load(game_name)
end

# puts rotate_text_array(tiles).collect(&:inspect).join(",\n")