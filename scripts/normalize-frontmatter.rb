sourceRegex = /^---\n.*?\n---/m
targetRegex = /^\* \* \*\n.*?\n\* \* \*/m

langsDir = File.join('.', 'lang')
langs = Dir.entries(langsDir).drop(2).reject {|lang| lang == 'en' }

# Build up a hashmap with all of the source front-matters
# { relativePath => frontMatter }
englishFiles = Dir.glob(File.join(langsDir, 'en', '**', '*.*'))
english = {}
englishFiles.each {|file|
  path = file.sub(File.join(langsDir, 'en'), '')
  contents = IO.read file
  result = contents.match sourceRegex
  english[path] = result
}

# Go through every file in every language and replace the broken front-matter
# with the source front-matter by relative path
langs.each {|lang|
  files = Dir.glob(File.join(langsDir, lang, '**', '*.*'))
  files.each {|file|
    path = file.sub(File.join(langsDir, lang), '')
    contents = IO.read file
    replacement = english[path]
    if replacement
      result = contents
        .encode('UTF-8', 'binary', invalid: :replace, undef: :replace, replace: '')
        .gsub(targetRegex) {|c| replacement }
      File.write(file, result)
    end
  }
}
