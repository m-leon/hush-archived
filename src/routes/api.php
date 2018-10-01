<?php

use Illuminate\Http\Request;

Route::resource('post', 'EncryptedPostController')->only(['store', 'show']);
