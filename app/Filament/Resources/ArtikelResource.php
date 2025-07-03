<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArtikelResource\Pages;
use App\Models\Artikel;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Illuminate\Support\Str;
use Filament\Forms\Set;
use Filament\Forms\Get;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ArtikelResource extends Resource
{
    protected static ?string $model = Artikel::class;
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Artikel';
    protected static ?string $pluralModelLabel = 'Artikel';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?string $modelLabel = 'Tambah Artikel';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Select::make('user_id')
                ->label('Penulis')
                ->relationship(
                    name: 'user',
                    titleAttribute: 'name',
                    modifyQueryUsing: fn ($query) => $query->whereHas('roles', fn ($q) => $q->where('name', 'penulis'))
                )
                ->preload()
                ->searchable()
                ->required(),

            Select::make('category_id')
                ->relationship('category', 'nama')
                ->preload()
                ->searchable()
                ->required(),

            TextInput::make('title')
                ->label('Judul')
                ->autofocus()
                ->live(onBlur: true)
                ->afterStateUpdated(function (?string $state, Get $get, Set $set) {
                    if (blank($get('slug')) && filled($state)) {
                        $set('slug', Str::slug($state));
                    }
                })
                ->maxLength(255)
                ->required(),

            TextInput::make('slug')
                ->readOnly()
                ->required()
                ->unique(Artikel::class, 'slug', ignoreRecord: true),

            RichEditor::make('content')
                ->label('Konten Artikel')
                ->toolbarButtons([
                    'bold',
                    'italic',
                    'underline',
                    'strike',
                    'codeBlock',
                    'blockquote',
                    'bulletedList',
                    'numberedList',
                    'link',
                    'h1',
                ])
                ->required(),

            Textarea::make('excerpt')
                ->label('Ringkasan')
                ->readOnly()
                ->afterStateHydrated(function ($state, callable $set, Get $get) {
                    if (blank($state) && filled($get('content'))) {
                        $set('excerpt', Str::words(strip_tags($get('content')), 30));
                    }
                })
                ->columnSpanFull(),

            FileUpload::make('image')
                ->label('Gambar')
                ->image()
                ->directory('artikels')
                ->disk('public')
                ->imagePreviewHeight('200')
                ->previewable()
                ->preserveFilenames()
                ->required(),

            Select::make('tags')
                ->label('Tag')
                ->multiple()
                ->relationship('tags', 'nama')
                ->preload()
                ->searchable()
                ->saveRelationshipsUsing(fn ($record, $state) => $record->tags()->sync($state)),

            Select::make('status')
                ->label('Status Artikel')
                ->options([
                    'draft' => 'Draft (Belum selesai)',
                    'review' => 'Menunggu Review',
                    'published' => 'Sudah Diterbitkan',
                    'archived' => 'Diarsipkan',
                ])
                ->default('draft')
                ->required(),

            DateTimePicker::make('published_at')
                ->label('Tanggal Publikasi')
                ->default(now())
                ->timezone('Asia/Jakarta')
                ->nullable()
                ->required(),

            DateTimePicker::make('updated_at')
                ->label('Tanggal Diperbarui')
                ->disabled()
                ->hiddenOn('create')
                ->timezone('Asia/Jakarta')
                ->default(now()),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')->label('Judul')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('user.name')->label('Penulis'),
                Tables\Columns\TextColumn::make('category.nama')->label('Kategori'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn ($state) => match ($state) {
                        'draft' => 'warning',
                        'review' => 'gray',
                        'published' => 'success',
                        'archived' => 'gray',
                    }),
                Tables\Columns\ImageColumn::make('image')->label('Gambar'),
                Tables\Columns\TextColumn::make('published_at')->label('Publikasi')->dateTime()->sortable(),
                Tables\Columns\ToggleColumn::make('is_featured')->label('Tampilkan di Beranda'),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')->options([
                    'draft' => 'Draft',
                    'review' => 'Menunggu Review',
                    'published' => 'Sudah Diterbitkan',
                    'archived' => 'Diarsipkan',
                ]),
                SelectFilter::make('user_id')
                    ->label('Penulis')
                    ->relationship('user', 'name')
                    ->preload()
                    ->searchable(),
                TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make()
                    ->visible(fn ($record) => method_exists($record, 'trashed') ? !$record->trashed() : true)
                    ->requiresConfirmation(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListArtikels::route('/'),
            'create' => Pages\CreateArtikel::route('/create'),
            'edit' => Pages\EditArtikel::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([SoftDeletingScope::class]);
    }
}
