update incidents set state = $1
where id = $2
returning *