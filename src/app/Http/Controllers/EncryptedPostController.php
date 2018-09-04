<?php

namespace App\Http\Controllers;

use App\EncryptedPost;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class EncryptedPostController extends Controller {
  /**
   * Returns cipher for given ID
   *
   * @param  Request  $request
   * @return Response
   */
  public function getByID(Request $request) {
    try {
      $post = EncryptedPost::findOrFail($request->id);
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
    do {
      // Generate an random UUID to use as ID
      $id = (string) Str::uuid();
    } while (EncryptedPost::find($id)); // Check that there doesn't exist a post with the same ID

    // Create Model of post with given data
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