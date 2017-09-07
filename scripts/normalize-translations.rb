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

# haha easier to read
puts langs
