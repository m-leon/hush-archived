<?php

use Illuminate\Http\Request;

Route::get('/post/{id}', 'EncryptedPostController@getByID');

Route::put('/post', 'EncryptedPostController@store');
