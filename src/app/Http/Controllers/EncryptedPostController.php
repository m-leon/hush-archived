<?php

namespace App\Http\Controllers;

use App\EncryptedPost;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EncryptedPostController extends Controller {
  public function getByID(Request $request) {
    try {
      $post = EncryptedPost::where('id', $request->id)->firstOrFail();
      return response()->json([
        'status' => '0',
        'ciphertext' => $post->ciphertext
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => '22' // 'Invalid argument' per errno.h
      ]);
    }
  }

  /**
   * Create a new encrypted post instance.
   *
   * @param  Request  $request
   * @return Response
   */
  public function store(Request $request) {
    $id = 'UN-ID-1234';// TODO: Generate ID as a UUID?
    $post = new EncryptedPost;
    $post->id = $id;
    $post->ciphertext = $request->cipher;
    $post->save();
    return response()->json([
      'status' => '0',
      'id' => $id
    ]);
  }
}
