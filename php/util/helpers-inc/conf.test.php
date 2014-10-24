<?php
// test server settings
Helpers::$session_name = 'todo-dev';

Helpers::debug_mode(true);

Helpers::$use_db = 'test';

Helpers::no_cache_headers();

define('DEV_MODE', true);
