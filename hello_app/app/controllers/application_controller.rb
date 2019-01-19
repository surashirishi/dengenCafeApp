class ApplicationController < ActionController::Base
  def hello
    render html: "ひ world!"
  end
end
