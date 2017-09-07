puts "Normalizing toc..."

# frontmatterSourceRegex = %r!\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)!m
# frontmatterTargetRegex = %r!\A(\* \* \*\s*\n.*?\n?)^((\* \* \*|\.\.\.)\s*$\n?)!m

frontmatterSourceRegex = /^---.*?---/m
frontmatterTargetRegex = /^\* \* \*.*?\* \* \*/m

tocRegex = /\[\]\(#toc-(.*?)\)\{#toc-.*?\}/

langsDir = File.join('.', 'lang')
langs = Dir.entries(langsDir).drop(2).reject {|lang| lang == 'en' }

# haha easier to read
puts "langsDir"
puts langsDir
puts "entries"
puts Dir.entries(langsDir)
puts "reject"
puts Dir.entries(langsDir).drop(2).reject {|lang| lang == 'en' }
