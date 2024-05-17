# frozen_string_literal: true

# name: socratic-bot
# about: This socratic bot will allow you to critically analyze your post to identify any fallacies or biases, ensuring your content is clear and impactful.
# meta_topic_id: TODO
# version: 0.0.1
# authors: Agoracity
# url: TODO
# required_version: 2.7.0

enabled_site_setting :plugin_name_enabled

register_svg_icon "socratic-icon" if respond_to?(:register_svg_icon)

module ::MyPluginModule
  PLUGIN_NAME = "discourse-socratic-bot"
end

require_relative "lib/my_plugin_module/engine"

after_initialize do
  # Code which should run after Rails has finished booting
end
