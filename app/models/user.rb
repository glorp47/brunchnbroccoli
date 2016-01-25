# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base
  attr_reader :password

  has_one :user_profile, inverse_of: :user, dependent: :destroy

  has_many :trip_reservations,
    foreign_key: :requester_id,
    primary_key: :id,
    class_name: 'Reservation'

  has_many :listings,
    primary_key: "id",
    foreign_key: "host_id",
    class_name: "Room",
    dependent: :destroy

  validates :username, presence: true, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: true

  accepts_nested_attributes_for :user_profile

  after_initialize :ensure_session_token

  after_create :generate_user_profile!


  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.new_with_name(user_params)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def generate_user_profile!
    self.create_user_profile if self.user_profile.nil?
  end
end
