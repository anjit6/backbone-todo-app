<?php
	require '../util/Slim/Slim.php';
	require '../util/helpers.php';
	header('Content-type: application/json');


	$tasks = new Slim();
	
	$tasks->get('/todos', 'getTasksList');
	$tasks->post('/todos', 'addTask');
	$tasks->put('/todos/:id', 'updateTask');
	$tasks->delete('/todos/:id', 'deleteTask');
	
	$tasks->run();

	$response = array();
	
	function getTasksList() {
		
		/**
		 * TODO: implement using database
		 **/
		
		$con = Helpers::pdo_db_connect();
		$req_params = get_req_params();
		$sql_params = array();
		$response = array();
		
		$get_all_tasks_sql = <<<SQL
			SELECT *
			FROM task
SQL;

		$get_all_tasks_stmt = Helpers::execute_query($con, $get_all_tasks_sql, $sql_params);

		$count = 0;
		
		while($row = $get_all_tasks_stmt->fetchObject()) {
			
			$response[$count]['id'] = $row->tsk_id;
			$response[$count]['description'] = $row->description_tsk;
			$response[$count]['status'] = $row->status_tsk;
			$response[$count]['tstmp'] = $row->tstmp_tsk;
			
			$count++;
		}
		
		echo json_encode($response);
	}
	
	function addTask() {
		
		$con = Helpers::pdo_db_connect();
		$req_params = get_req_params();
		$sql_params = array();
		$response = array();

		$update_sql = <<<SQL
			INSERT INTO task (tsk_id, description_tsk, status_tsk)
			VALUES (NULL, :description, :status)
SQL;

		$sql_params['status'] = $req_params['status'];
		$sql_params['description'] = $req_params['description'];

		$update_stmt = Helpers::execute_query($con, $update_sql, $sql_params);
		$id = $con->lastInsertId();
		
		echo json_encode($response);
	}
	
	function updateTask() {
		
		$con = Helpers::pdo_db_connect();
		$req_params = get_req_params();
		$response = array();
		
		$update_sql = <<<SQL
			UPDATE task
			SET status_tsk = :status, description_tsk = :description
			WHERE tsk_id = :id
SQL;

		$sql_params = array();
		$sql_params['id'] = $req_params['id'];
		$sql_params['status'] = $req_params['status'];
		$sql_params['description'] = $req_params['description'];
		
		$update_stmt = Helpers::execute_query($con, $update_sql, $sql_params);
		
		$response['success'] = 1;		
		echo json_encode($response);
	}
	
	function deleteTask($id) {
		
		$con = Helpers::pdo_db_connect();
		$response = array();

		$update_sql = <<<SQL
			DELETE FROM task
			WHERE tsk_id = :id
SQL;
		
		$sql_params = array();
		$sql_params['id'] = $id;

		$update_stmt = Helpers::execute_query($con, $update_sql, $sql_params);

		$response['success'] = 1;
		
		json_encode($response);		
	}
	
	function get_req_params() {
		
		$instance = Slim::getInstance();
		$request = $instance->request();
				
		/**
		 * getBody() method does not return parameters sent by a GET request.
		 * passing second parameter `true` to json_decode will return an associative array
		 **/
		if ($request->isPost()) {
			$req_params = json_decode($request->getBody(), true);
		}
		if ($request->isGet()) {
			$req_params = $request->get();
		}
		else if ($request->isPut()) {
			$req_params = json_decode($request->getBody(), true);
		}
		else {
			$req_params = json_decode($request->getBody(), true);
		}
		
		return $req_params;
	}
?>