puts "Normalizing toc..."

# frontmatterSourceRegex = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m
# frontmatterTargetRegex = %r!\A(\* \* \*\s*\n.*?\n?)^((\* \* \*|\.\.\.)\s*$\n?)!m

frontmatterSourceRegex = /^---.*?---/m
frontmatterTargetRegex = /^\* \* \*.*?\* \* \*/m

tocRegex = /\[\]\(#toc-(.*?)\)\{#toc-.*?\}/

langsDir = File.join('.', 'lang')
langs = Dir.entries(langsDir).drop(2).reject {|lang| lang == 'en' }

# Build up a hashmap with all of the source front-matters
# { relativePath => frontMatter }
englishFiles = Dir.glob(File.join(langsDir, 'en', '**', '*.*'))
english = {}
englishFiles.each {|file|
  path = file.sub(File.join(langsDir, 'en'), '')
  contents = IO.read file
  contents = contents.unicode_normalize
  result = contents.match frontmatterSourceRegex
  english[path] = result
}

langs.each {|lang|
  files = Dir.glob(File.join(langsDir, lang, '**', '*.*'))
  # debugging: what is `files`?
  puts files

  files.each {|file|
    puts "- Replacing #{file}"

    path = file.sub(File.join(langsDir, lang), '')
    contents = IO.read file
    frontmatter = english[path]
    # this is for debugging, I want to know which line fails
    puts contents

    result = contents
    result = result.unicode_normalize
    result = result.gsub /\r\n?/, "\n"
    result = result + "\n"
    result = result.gsub(tocRegex, '<a class="toc" id="toc-\1" href="#toc-\1"></a>')
    result = result.gsub(frontmatterTargetRegex) {|c| frontmatter } if frontmatter

    File.write(file, result)
  }
}
