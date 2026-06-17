class AuthController < ApplicationController
  skip_before_action :authenticate_user_from_token!, only: [:register, :login]

  def register
    role = Role.find_by!(name: "user")

    user = User.new(
      email: params[:user][:email],
      login: params[:user][:login],
      nickname: params[:user][:nickname].presence || params[:user][:login],
      password: params[:user][:password],
      password_confirmation: params[:user][:password_confirmation],
      role: role
    )

    user.auth_token = SecureRandom.hex(20)

    if user.save
      render json: auth_response(user), status: :created
    else
      render json: ApiResponse.error(
        message: user.errors.full_messages.join(", "),
        code: "VALIDATION_ERROR"
      ), status: :unprocessable_entity
    end
  end

    def login
        user = User.find_by(login: params[:login]) || User.find_by(email: params[:login])

        if user&.valid_password?(params[:password])
            user.update!(auth_token: SecureRandom.hex(20))

            render json: auth_response(user)
        else
            render json: ApiResponse.error(
            message: "Неверный логин или пароль",
            code: "INVALID_CREDENTIALS"
            ), status: :unauthorized
        end
    end

  def me
    render json: ApiResponse.success(
      data: {
        id: current_user.id,
        login: current_user.login,
        nickname: current_user.nickname,
        email: current_user.email,
        role: current_user.role.name
      }
    )
  end

  private

  def auth_response(user)
    ApiResponse.success(
      data: {
        token: user.auth_token,
        user: {
          id: user.id,
          login: user.login,
          nickname: user.nickname,
          email: user.email,
          role: user.role.name
        }
      }
    )
  end
end