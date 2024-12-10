import React, { useState } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    IconButton,
    MenuItem,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const WaterCompensationForm = ({ corporations, substances }) => {
    const [fields, setFields] = useState([{ substance_id: '', mass: '' }]);
    const [data, setData] = useState({
        corporation_id: '',
        year: '',
        category_coefficient: '',
        regional_coefficient: '',
        polution_mass: '',
        indexated_loss: '',
        substance_count: 1, // Изначально одно поле
    });

    const handleAddField = () => {
        setFields([...fields, { substance_id: '', mass: '' }]);
        setData({ ...data, substance_count: fields.length + 1 });
    };

    const handleDeleteField = (index) => {
        const updatedFields = fields.filter((_, i) => i !== index);
        setFields(updatedFields);
        setData({ ...data, substance_count: updatedFields.length });
    };

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...fields];
        updatedFields[index][field] = value;
        setFields(updatedFields);
    };

    const handleInputChange = (field, value) => {
        setData({ ...data, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...data,
            substances: fields,
        };
        console.log(payload); // Отправка данных на сервер
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Розрахунок водної компенсації
                </Typography>
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        select
                        label="Підприємство"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        value={data.corporation_id}
                        onChange={(e) =>
                            handleInputChange('corporation_id', e.target.value)
                        }
                    >
                        <MenuItem value="">
                            <em>Оберіть підприємство</em>
                        </MenuItem>
                        {corporations.map((corp) => (
                            <MenuItem key={corp.id} value={corp.id}>
                                {corp.title}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Рік"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.year}
                        onChange={(e) => handleInputChange('year', e.target.value)}
                    />

                    <TextField
                        label="Коефіцієнт категорії"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.category_coefficient}
                        onChange={(e) =>
                            handleInputChange('category_coefficient', e.target.value)
                        }
                    />

                    <TextField
                        label="Регіональний коефіцієнт"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.regional_coefficient}
                        onChange={(e) =>
                            handleInputChange('regional_coefficient', e.target.value)
                        }
                    />

                    <TextField
                        label="Індексовані втрати"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        type="number"
                        value={data.indexated_loss}
                        onChange={(e) =>
                            handleInputChange('indexated_loss', e.target.value)
                        }
                    />

                    <Typography variant="h6" sx={{ mt: 3 }}>
                        Субстанції
                    </Typography>
                    {fields.map((field, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <TextField
                                select
                                label={`Субстанція ${index + 1}`}
                                variant="outlined"
                                fullWidth
                                required
                                value={field.substance_id}
                                onChange={(e) =>
                                    handleFieldChange(index, 'substance_id', e.target.value)
                                }
                            >
                                <MenuItem value="">
                                    <em>Оберіть субстанцію</em>
                                </MenuItem>
                                {substances.map((sub) => (
                                    <MenuItem key={sub.id} value={sub.id}>
                                        {sub.title}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label={`Маса ${index + 1}`}
                                variant="outlined"
                                type="number"
                                fullWidth
                                required
                                value={field.mass}
                                onChange={(e) =>
                                    handleFieldChange(index, 'mass', e.target.value)
                                }
                            />
                            <IconButton
                                color="error"
                                onClick={() => handleDeleteField(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}

                    <Button
                        type="button"
                        variant="outlined"
                        startIcon={<AddCircleIcon />}
                        sx={{ mt: 2 }}
                        onClick={handleAddField}
                    >
                        Додати субстанцію
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 4 }}
                    >
                        Розрахувати
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default WaterCompensationForm;
