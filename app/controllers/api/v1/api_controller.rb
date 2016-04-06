class API::V1::APIController < ApplicationController
  include ActionController::HttpAuthentication::Token::ControllerMethods

  before_action :authenticate
  include Pundit
  after_action :verify_authorized

  def authenticate
    /JWT (?<token>.+)/ =~ request.headers['HTTP_AUTHORIZATION']
    if token
      email = SessionToken.decode(token)
      @current_user = User.find_by(email:email)
    end
  end

  def current_user
    @current_user
  end
end