INSERT into incidents(state, injuryid, causeid)
values($1, $2, $3)
returning *