class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # protect_from_forgery with: :null_session

  def require_no_user!
    render json: {error: "Already logged in"}, status: 400 if current_user
  end

  def require_login!
    render json: {error: "Not logged in"}, status: 401 if current_user.nil?
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.reset_session_token! unless current_user.nil?
    session[:session_token] = nil
  end

  def require_user!
    render json: ["Not logged in!"] if current_user.nil?
  end
end
