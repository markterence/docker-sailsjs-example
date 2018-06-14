CREATE OR REPLACE VIEW `view_todo_aggre` AS
	SELECT SUM(isCompleted) as sum_completed FROM todo WHERE is_deleted = false