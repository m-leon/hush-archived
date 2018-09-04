<?php

use Illuminate\Http\Request;

Route::get('/post/{id}', function ($id) {
  return response()->json([
    'status' => '1',
    'ciphertext' => '6ec5ea2f635576eeccc7275da727a735e5065d2fa7a7cfde230b6a95dc5def337df9582bd17646cc2fb23ef4018033c2voQZqOmSpPs+OcGcHjj3Aw==',
    'id' => $id
  ]);
});

Route::put('/post', function() {
  return response()->json([
    'status' => '1',
    'id' => '1234'
  ]);
});
