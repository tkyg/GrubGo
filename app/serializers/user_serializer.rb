class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :role
  
end
