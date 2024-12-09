import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableSortLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const CompensationsCreate = ({ compensations, corporations, substances }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        salary: '',
        middle_concentration: '',
        middle_year_concentration: '',
        coefficient_villagers_count: '',
        coefficient_national_economy: '',
    });

    const [editData, setEditData] = useState({
        id: null,
        corporation_id: '',
        substance_id: '',
        year: '',
        volume: '',
        salary: '',
        middle_concentration: '',
        middle_year_concentration: '',
        coefficient_villagers_count: '',
        coefficient_national_economy: '',
    });

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [orderColumn, setOrderColumn] = useState('');
    const [orderDir, setOrderDir] = useState('asc');

    const submit = (e) => {
        e.preventDefault();
        // Отправка данных на бекенд для создания записи
        post('/compensations', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id) => {
        Inertia.delete(`/compensations/${id}`, {
            preserveScroll: true,
        });
    };

    const handleEditOpen = (item) => {
        setEditData({
            ...item,
            corporation_id: item.corporation_id ? item.corporation_id : '',
            substance_id: item.substance_id ? item.substance_id : '',
        });
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        Inertia.put(`/compensations/${editData.id}`, {
            ...editData,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
            },
        });
    };

    const handleSort = (column) => {
        const isDesc = orderColumn === column && orderDir === 'desc';
        const direction = isDesc ? 'asc' : 'desc';
        setOrderColumn(column);
        setOrderDir(direction);
        // При необходимости можно сделать запрос с сортировкой
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Розрахунок компенсації
                </Typography>
                <form onSubmit={submit} noValidate>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            select
                            label="Підприємство"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.corporation_id}
                            onChange={(e) => setData('corporation_id', e.target.value ? parseInt(e.target.value, 10) : '')}
                            error={Boolean(errors.corporation_id)}
                            helperText={errors.corporation_id}
                        >
                            <MenuItem value="">
                                <em>Оберіть підприємство</em>
                            </MenuItem>
                            {corporations && corporations.map((corp) => (
                                <MenuItem key={corp.id} value={corp.id}>
                                    {corp.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <IconButton
                            color="primary"
                            component={Link}
                            href="/corporations"
                            sx={{ ml: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField
                            select
                            label="Забруднююча речовина"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            value={data.substance_id}
                            onChange={(e) => setData('substance_id', e.target.value ? parseInt(e.target.value, 10) : '')}
                            error={Boolean(errors.substance_id)}
                            helperText={errors.substance_id}
                        >
                            <MenuItem value="">
                                <em>Оберіть забруднюючу речовину</em>
                            </MenuItem>
                            {substances && substances.map((sub) => (
                                <MenuItem key={sub.id} value={sub.id}>
                                    {sub.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        <IconButton
                            color="primary"
                            component={Link}
                            href="/substances"
                            sx={{ ml: 2 }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </Box>

                    <TextField
                        select
                        label="Рік"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        error={Boolean(errors.year)}
                        helperText={errors.year}
                    >
                        {Array.from({ length: 2024 - 1915 + 1 }, (_, i) => 2024 - i).map((yr) => (
                            <MenuItem key={yr} value={yr}>
                                {yr}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Обсяг (volume)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.volume}
                        onChange={(e) => setData('volume', e.target.value)}
                        error={Boolean(errors.volume)}
                        helperText={errors.volume}
                    />

                    <TextField
                        label="Зарплата (salary)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.salary}
                        onChange={(e) => setData('salary', e.target.value)}
                        error={Boolean(errors.salary)}
                        helperText={errors.salary}
                    />

                    <TextField
                        label="Середня концентрація (middle_concentration)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.middle_concentration}
                        onChange={(e) => setData('middle_concentration', e.target.value)}
                        error={Boolean(errors.middle_concentration)}
                        helperText={errors.middle_concentration}
                    />

                    <TextField
                        label="Середньорічна концентрація (middle_year_concentration)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.middle_year_concentration}
                        onChange={(e) => setData('middle_year_concentration', e.target.value)}
                        error={Boolean(errors.middle_year_concentration)}
                        helperText={errors.middle_year_concentration}
                    />

                    <TextField
                        label="Коефіцієнт кількості мешканців (coefficient_villagers_count)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.coefficient_villagers_count}
                        onChange={(e) => setData('coefficient_villagers_count', e.target.value)}
                        error={Boolean(errors.coefficient_villagers_count)}
                        helperText={errors.coefficient_villagers_count}
                    />

                    <TextField
                        label="Коеф. для національної економіки (coefficient_national_economy)"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.coefficient_national_economy}
                        onChange={(e) => setData('coefficient_national_economy', e.target.value)}
                        error={Boolean(errors.coefficient_national_economy)}
                        helperText={errors.coefficient_national_economy}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={processing}
                    >
                        Розрахувати компенсацію
                    </Button>
                </form>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Список компенсацій
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Підприємство</TableCell>
                                <TableCell>Речовина</TableCell>
                                <TableCell>
                                    <TableSortLabel
                                        active={orderColumn === 'year'}
                                        direction={orderDir}
                                        onClick={() => handleSort('year')}
                                    >
                                        Рік
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Обсяг</TableCell>
                                <TableCell>Зарплата</TableCell>
                                <TableCell>Сер. конц.</TableCell>
                                <TableCell>Сер. річна конц.</TableCell>
                                <TableCell>Коеф. мешканців</TableCell>
                                <TableCell>Коеф. нац. економіки</TableCell>
                                <TableCell>Розрахована компенсація</TableCell>
                                <TableCell align="right">Дії</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {compensations && compensations.length > 0 ? (
                                compensations.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.corporation?.title}</TableCell>
                                        <TableCell>{item.substance?.title}</TableCell>
                                        <TableCell>{item.year}</TableCell>
                                        <TableCell>{item.volume}</TableCell>
                                        <TableCell>{item.salary}</TableCell>
                                        <TableCell>{item.middle_concentration}</TableCell>
                                        <TableCell>{item.middle_year_concentration}</TableCell>
                                        <TableCell>{item.coefficient_villagers_count}</TableCell>
                                        <TableCell>{item.coefficient_national_economy}</TableCell>
                                        <TableCell>{item.calculated_compensation}</TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                edge="end"
                                                aria-label="edit"
                                                color="primary"
                                                onClick={() => handleEditOpen(item)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                color="error"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={12} align="center">
                                        Немає записів компенсацій
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={isEditModalOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Редагувати компенсацію</DialogTitle>
                <DialogContent>
                    <form id="edit-form" onSubmit={handleEditSubmit} noValidate>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                select
                                label="Підприємство"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={editData.corporation_id || ''}
                                onChange={(e) =>
                                    setEditData({ ...editData, corporation_id: e.target.value ? parseInt(e.target.value, 10) : '' })
                                }
                                error={Boolean(errors.corporation_id)}
                                helperText={errors.corporation_id}
                            >
                                {corporations && corporations.map((corp) => (
                                    <MenuItem key={corp.id} value={corp.id}>
                                        {corp.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <IconButton
                                color="primary"
                                component={Link}
                                href="/corporations"
                                sx={{ ml: 2 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                select
                                label="Забруднююча речовина"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                value={editData.substance_id || ''}
                                onChange={(e) =>
                                    setEditData({ ...editData, substance_id: e.target.value ? parseInt(e.target.value, 10) : '' })
                                }
                                error={Boolean(errors.substance_id)}
                                helperText={errors.substance_id}
                            >
                                {substances && substances.map((sub) => (
                                    <MenuItem key={sub.id} value={sub.id}>
                                        {sub.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <IconButton
                                color="primary"
                                component={Link}
                                href="/substances"
                                sx={{ ml: 2 }}
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Box>

                        <TextField
                            label="Рік"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.year || ''}
                            onChange={(e) => setEditData({ ...editData, year: e.target.value })}
                            error={Boolean(errors.year)}
                            helperText={errors.year}
                        />

                        <TextField
                            label="Обсяг"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.volume || ''}
                            onChange={(e) => setEditData({ ...editData, volume: e.target.value })}
                            error={Boolean(errors.volume)}
                            helperText={errors.volume}
                        />

                        <TextField
                            label="Зарплата"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.salary || ''}
                            onChange={(e) => setEditData({ ...editData, salary: e.target.value })}
                            error={Boolean(errors.salary)}
                            helperText={errors.salary}
                        />

                        <TextField
                            label="Сер. конц."
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.middle_concentration || ''}
                            onChange={(e) =>
                                setEditData({ ...editData, middle_concentration: e.target.value })
                            }
                            error={Boolean(errors.middle_concentration)}
                            helperText={errors.middle_concentration}
                        />

                        <TextField
                            label="Сер. річна конц."
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.middle_year_concentration || ''}
                            onChange={(e) =>
                                setEditData({ ...editData, middle_year_concentration: e.target.value })
                            }
                            error={Boolean(errors.middle_year_concentration)}
                            helperText={errors.middle_year_concentration}
                        />

                        <TextField
                            label="Коеф. мешканців"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.coefficient_villagers_count || ''}
                            onChange={(e) =>
                                setEditData({ ...editData, coefficient_villagers_count: e.target.value })
                            }
                            error={Boolean(errors.coefficient_villagers_count)}
                            helperText={errors.coefficient_villagers_count}
                        />

                        <TextField
                            label="Коеф. нац. економіки"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            type="number"
                            value={editData.coefficient_national_economy || ''}
                            onChange={(e) =>
                                setEditData({ ...editData, coefficient_national_economy: e.target.value })
                            }
                            error={Boolean(errors.coefficient_national_economy)}
                            helperText={errors.coefficient_national_economy}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Відміна</Button>
                    <Button type="submit" form="edit-form" variant="contained" color="primary">
                        Зберегти
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CompensationsCreate;