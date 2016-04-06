class API::V1::SessionsController < API::V1::APIController
  before_action :skip_authorization

  def register
    @user = User.new(user_params)
    if !@user.save
      render status: :unprocessable_entity
    end
  end

  def create
    user = User.find_by(email:params[:email])
    if user&.authenticate(params[:password])
      @jwt = SessionToken.encode(user)
    else
      render status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation, :url_slug, :display_name)
  end
end