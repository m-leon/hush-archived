<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CheckDB extends Command {
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'check:db';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Check if DB is up';

  /**
   * Create a new command instance.
   *
   * @return void
   */
  public function __construct() {
    parent::__construct();
  }

  /**
   * Execute the console command.
   *
   * @return mixed
   */
  public function handle() {
    try {
      DB::connection()->getPdo();
      exit(0);
    } catch (\Exception $e) {
      exit(1);
    }
  }
}
