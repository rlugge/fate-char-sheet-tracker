class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :display_name, presence: true, length: { minimum: 3}
  validates :url_slug, presence: true, length: { minimum: 3}
  validates_presence_of :role

  enum role: [:user, :admin]
end
