puts "Validating translations..."

mdFiles = Dir.glob(File.join('.', '_site', 'lang', '**', '*.md'))

if mdFiles.size > 0
  puts "Error: Found translations still in markdown"
  puts mdFiles
  exit 1
else
  puts "Valid."
  exit 0
end
