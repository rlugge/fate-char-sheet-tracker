class SessionToken
  def self.encode(user)
    payload = { 
      email: user.email,
      exp: Time.now.to_i + 60 * 60 * 24
    }
    JWT.encode payload, ENV["JWT_SECRET_KEY"], 'HS512'
  end

  def self.decode(token)
    result = JWT.decode token, ENV["JWT_SECRET_KEY"], true, { algorithm: 'HS512' }
    result[0]["email"]
  end
end