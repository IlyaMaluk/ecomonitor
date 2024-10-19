<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('tax_types')->insert([
            [
                'name' => 'air',
                'real_name' => 'За викиди в атмосферне повітря забруднюючих речовин стаціонарними джерелами забруднення',
                'fields' => json_encode([
                    'selectable' => [],
                    'input' => [
                        [
                            'slug' => 'tax',
                            'name' => 'Ставка податку грн/т',
                        ],
                    ]
                ]),
            ],
            [
                'name' => 'water',
                'real_name' => 'За скиди забруднюючих речовин у водні об`єкти',
                'fields' => json_encode([
                    'selectable' => [
                        'slug' => 'coefficient',
                        'options' => [
                            [
                                'name' => 'Коеф 1.5(у випадку скидання забруднюючих речовин у ставки і озера)',
                                'value' => 1.5,
                            ],
                            [
                                'name' => 'Коеф 1 (інші випадки)',
                                'value' => 1,
                            ],
                        ]
                    ],
                    'input' => [
                        [
                            'slug' => 'tax',
                            'name' => 'Ставка податку грн/т',
                        ],
                    ]
                ]),
            ],
            [
                'name' => 'waste_placement',
                'real_name' => 'За розміщення відходів',
                'fields' => json_encode([
                    'selectable' => [
                        'slug' => 'coefficient',
                        'options' => [
                            [
                                'name' => 'Коеф 3 (в межах населеного пункту або на відстані менше ніж 3 км)',
                                'value' => 3,
                            ],
                            [
                                'name' => 'Коеф 1 (більше 3 км від населеного пункту)',
                                'value' => 1,
                            ]
                        ]
                    ],
                    'input' => [
                        [
                            'slug' => 'tax',
                            'name' => 'Ставка податку грн/т',
                        ],
                    ]
                ]),
            ],
            [
                'name' => 'radioactive',
                'real_name' => 'За утворення радіоактивних відходів',
                'fields' => json_encode([
                    'selectable' => [
                        'slug' => 'coefficient',
                        'options' => [
                            [
                                'name' => 'Для високоактивних(рв = 50)',
                                'value' => 50,
                            ],
                            [
                                'name' => 'Для середньоактивних та низькоактивних(рнс = 2)',
                                'value' => 2,
                            ]
                        ]
                    ],
                    'input' => [
                        [
                            'slug' => 'volume',
                            'name' => 'Фактичний обсяг електричної енергії(On)',
                        ],
                        [
                            'slug' => 'cost_price_ion',
                            'name' => 'Собівартість зберігання 1 м^3 відходів у вигляді джерел іонізуючого випромінювання утворених їх виробниками за базовий податковий період(C1)',
                        ],
                        [
                            'slug' => 'cost_price',
                            'name' => 'Собівартість зберігання відходів накопичених іх виробниками до 1 квітня 2009(C2)',
                        ],
                    ],
                ]),
            ],
            [
                'name' => 'temp_radioactive',
                'real_name' => 'За тимчасове зберігання радіоактивних відходів їх виробниками понад установлений строк',
                'fields' => json_encode([
                    'selectable' => [],
                    'input' => [
                        [
                            'slug' => 'n',
                            'name' => 'Ставка податку(N) грн з копійками',
                        ],
                        [
                            'slug' => 'v',
                            'name' => 'Об’єм відходів(V) см^3',
                        ],
                        [
                            'slug' => 't',
                            'name' => 'Період(T) календарних кварталів',
                        ],
                    ]
                ]),
            ],
        ]);
    }
}
