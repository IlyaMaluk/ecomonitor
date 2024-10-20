<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateLogRequest;
use App\Services\LogService;
use Illuminate\Http\RedirectResponse;

class LogController extends Controller
{
    public function __construct(
        private readonly LogService $service,
    ) {
    }

    public function store(CreateLogRequest $request): RedirectResponse
    {
        dd($request->validated());
        dd($this->service->create($request));

        return redirect()->route('home.index');
    }

    public function update(int $id, CreateLogRequest $request): RedirectResponse
    {
        $this->service->update($id, $request);

        return redirect()->route('home.index');
    }

    public function destroy(int $id): RedirectResponse
    {
        $this->service->destroy($id);

        return redirect()->route('home.index');
    }
}
