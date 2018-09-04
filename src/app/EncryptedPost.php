<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EncryptedPost extends Model {
  protected $table = 'encrypted_posts';
  protected $fillable = array('id', 'ciphertext');
}
