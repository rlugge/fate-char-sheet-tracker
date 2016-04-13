if(@jwt)
	json.jwt @jwt
	json.user @user
else
	json.error "Invalid email/username combination"
end