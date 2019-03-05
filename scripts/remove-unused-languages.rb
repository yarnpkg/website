require "yaml"

puts "Removing unused languages..."

languagesFile = File.join('.', '_data', 'languages.yml')
languages = YAML.load_file(languagesFile)

languagesEnabledHash = {}
languages.each {|language|
  if language['enabled']
    languagesEnabledHash[ language['tag'] ] = true
  end
}

langDirectory = File.join('.', 'lang')

langs = Dir.entries(langDirectory).select { |entry|
  File.directory? File.join(langDirectory, entry) and !(entry == '.' || entry == '..')
}

langs.each {|lang|
  if languagesEnabledHash[lang]
    # puts "- Leaving #{lang}"
  else
    # puts "- Removing #{lang}..."
    system "rm _data/i18n/#{lang}.yml"
    system "rm -r lang/#{lang}"
  end
}
