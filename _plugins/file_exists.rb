# source: https://github.com/michaelx/jekyll_file_exists/blob/dd363223754836a640de81ddab68fd95cebe7791/file_exists.rb
module Jekyll
  class FileExistsTag < Liquid::Tag

      def initialize(tag_name, path, tokens)
          super
          @path = path
      end

      def render(context)
          # Pipe parameter through Liquid to make additional replacements possible
          url = Liquid::Template.parse(@path).render context

          # Adds the site source, so that it also works with a custom one
          site_source = context.registers[:site].config['source']
          dir_name = File.dirname(context.environments.first["page"]["path"])
          file_path = File.join(site_source, dir_name, url)

          # Check if file exists (returns true or false)
          "#{File.exist?(file_path)}"
      end
  end
end

Liquid::Template.register_tag('file_exists', Jekyll::FileExistsTag)
