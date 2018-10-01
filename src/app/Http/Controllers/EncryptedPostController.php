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
  public function show($id) {
    try {
      $post = EncryptedPost::findOrFail($id);

      // Check post's expiration
      if (is_null($post->expiration)) {
        // Post is set to expire after 1 view. Delete from DB. Return to user.
        $post->delete();
      } else if (strtotime($post->expiration) < time()) {
        // Post's expiration is in the past. Delete from DB. Don't return to user.
        $post->delete();
        throw new \Exception();
      }

      // Limited data sent to user. Don't diosclose the expiration to viewer.
      return response()->json([
        'status' => '0',
        'ciphertext' => $post->ciphertext
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'status' => '2'
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

    if ($request->expiration !== 0) {
      // Convert expiration to TIMESTAMP
      $post->expiration = date('Y-m-d H:i:s', $request->expiration);
    } else {
      // Post set to expire after 1 view. Stored as a NULL in db
      $post->expiration = NULL;
    }

    $post->save();

    return response()->json([
      'status' => '0',
      'id' => $id
    ]);
  }
}
