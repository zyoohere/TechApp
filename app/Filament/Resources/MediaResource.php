<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MediaResource\Pages;
use App\Models\Media;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;

class MediaResource extends Resource
{
    protected static ?string $model = Media::class;

    protected static ?string $navigationIcon = 'heroicon-o-photo';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $label = 'Media';
    protected static ?string $pluralLabel = 'Media Items';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->label('Judul Media')
                    ->required(),
                Textarea::make('caption')
                    ->label('Judul/Caption')
                    ->required(),
                Select::make('uploader.roles.name')
                    ->label('Uploader')
                    ->relationship(
                        name: 'uploader',
                        titleAttribute: 'name',
                        modifyQueryUsing: fn($query) => $query->whereHas('roles', function ($q) {
                            $q->whereIn('name', ['admin', 'penulis']);
                        }),
                    )
                    ->searchable()
                    ->preload(),
                    
                Radio::make('type')
                    ->label('Tipe Media')
                    ->options([
                        'image' => 'Gambar',
                        'video' => 'Video',
                        'external' => 'Tautan Eksternal (YouTube, Vimeo)',
                    ])
                    ->reactive()
                    ->required(),

                FileUpload::make('media_path')
                    ->label('Unggah File')
                    ->directory('media')
                    ->required()
                    ->disk('public')
                    ->directory('media')
                    ->preserveFilenames()
                    ->visible(fn($get) => in_array($get('type'), ['image', 'video']))
                    ->required(fn($get) => in_array($get('type'), ['image', 'video'])),

                TextInput::make('media_url')
                    ->label('Tautan Eksternal')
                    ->url()
                    ->visible(fn($get) => $get('type') === 'external')
                    ->required(fn($get) => $get('type') === 'external'),

                Toggle::make('is_featured')
                    ->label('Tampilkan di Beranda'),


            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('media_path')
                    ->label('Media')
                    ->disk('public') // Pastikan ini sesuai disk
                    ->visibility('visible')
                    ->height(80)
                    ->stacked()
                    ->limit(3)
                    ->limitedRemainingText()
                    ->circular(false),

                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('caption')->limit(30),
                TextColumn::make('type')->badge(),
                TextColumn::make('uploader.name')->label('Uploader'),
                ToggleColumn::make('is_featured'),
                TextColumn::make('created_at')->dateTime('d M Y'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->label('Tipe Media')
                    ->options([
                        'image' => 'Image',
                        'video' => 'Video',
                        'external' => 'External',
                    ])
                    ->label('Media Type')
                    ->placeholder('All Types'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMedia::route('/'),
            'create' => Pages\CreateMedia::route('/create'),
            'edit' => Pages\EditMedia::route('/{record}/edit'),
        ];
    }
}
