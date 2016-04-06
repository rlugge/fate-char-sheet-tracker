json.user(@user)
if(@user.errors)
	json.errors(@user.errors)
end