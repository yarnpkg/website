sourceRegex = /\[\]\(#toc-(.*?)\)\{#toc-.*?\}/

langsDir = File.join('.', 'lang')
langs = Dir.entries(langsDir).drop(2).reject {|lang| lang == 'en' }

langs.each {|lang|
  files = Dir.glob(File.join(langsDir, lang, '**', '*.*'))
  file = files[20]
  files.each {|file|
    contents = IO.read file
    result = contents.gsub(sourceRegex, '<a class="toc" id="toc-\1" href="#toc-\1"></a>')
    File.write(file, result)
  }
}
