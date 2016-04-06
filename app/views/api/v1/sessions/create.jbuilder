if(@jwt)
	json.token = @jwt
else
	json.error "Invalid email/username combination"
end