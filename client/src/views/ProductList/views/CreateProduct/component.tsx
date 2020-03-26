import { Divider, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import QRCode from 'qrcode.react';
import React, { useEffect } from 'react';
import Barcode from 'react-barcode';
import * as Yup from 'yup';

import * as Constants from '../../../../lib/constants';
import { APIClient } from '../../../../lib/fetch';
import * as Models from '../../../../lib/models';

enum TemplateTypes {
  BASIC = "Básico",
  SALE = "Promoción"
};


const apiClient = new APIClient('');

interface DetailsForm {
  name: string;
  category: string;
  brand: string;
  supplier: string;
  image?: File;
  expDate: Date | null;
  creationDate: Date | null;
  unit: Constants.UnitEnum;
  sku: string;
  description: string;
  barcode: string;
  qrCodeUrl: string;
  prices: {
    cost: number;
    price: number;
    affiliatePrice: number;
    margin: number;
  }
};
interface TagsForm {
  TWO_ONE_INCHES: {
    templateId: string;
    template: TemplateTypes,
    quantity: number
  },
  TWO_SIX_INCHES: {
    templateId: string;
    template: TemplateTypes,
    quantity: number
  },
  FOUR_TWO_INCHES: {
    templateId: string;
    template: TemplateTypes,
    quantity: number
  }
}
interface ProductForm {
  details: DetailsForm,
  tags: TagsForm
}

const TAG_DETAILS = {
  TWO_ONE_INCHES: {
    imageUrl: '/images/tags/2.13.png',
    name: '2.1"'
  },
  TWO_SIX_INCHES: {
    imageUrl: '/images/tags/2.6.png',
    name: '2.6"'
  },
  FOUR_TWO_INCHES: {
    imageUrl: '/images/tags/4.2.png',
    name: '4.2"'
  }
}
type Props = {
  classes: any;
  onBack: () => void;
}
type ImageState = {
  src: string | ArrayBuffer | null;
  data: File | null
}
function getSteps() {
  return ['Detalles', 'Selecciona Tags', 'Confirma']
}
const useStyles = makeStyles((theme: any) => 
  createStyles({
    title: {
      fontWeight: 200,
      paddingBottom: '2rem'
    },
    confirmationTitleSection: {
      fontSize: 14,
      marginLeft: '1.5rem'
    },
    cardTitle: {
      fontSize: 14,
    },
    confirmationTitle: {
      fontSize: 24,
      paddingLeft: theme.spacing(2)
    },
    descriptionTitle: {
      fontSize: 14,
      paddingLeft: theme.spacing(2)
    },
    gridItemContainer: {
      padding: theme.spacing(1)
    },
    numberInputMargin: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    buttonContainer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
      marginRight: theme.spacing(1),
    },
    descriptionContainer: {
      padding: theme.spacing(2)
    },
    codeContainer: {
      display: 'block',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    },
    imageContainer: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    bottomButtons: {
      marginTop: theme.spacing(4)
    },
    tableRow: {
      height: '64px'
    },
    tableStyles: {
      padding: theme.spacing(2)
    },
    confirmationTitleText: {
      paddingLeft: theme.spacing(4),
      marginBottom: theme.spacing(4),
      fontSize: 24,
      fontWeight: 500
    }
  })
);

export const CreateProduct: React.FC<Props> = ({ classes, onBack }) => {
  const selfClasses = useStyles();
  const [ activeStep, setActiveStep ] = React.useState(0);
  const [ loading, setLoading ] = React.useState(false);
  const [ loadingImage, setLoadingImg ] = React.useState(false);
  const [ urls, setUrls ] = React.useState({
    qrCodeUrl: '',
    barcode: ''
  });
  const [ imageData, setImageData ] = React.useState<ImageState>({
    data: null,
    src: null
  });
  const [ imageSrc, setImageSrc ] = React.useState('');

  const [tagState, setTagState ] = React.useState({
    TWO_ONE_INCHES: {
      templates: [{
        templateId: '',
        templateName: ''
      }]
    },
    TWO_SIX_INCHES: {
      templates: [{
        templateId: '',
        templateName: ''
      }]
    },
    FOUR_TWO_INCHES: {
      templates: [{
        templateId: '',
        templateName: ''
      }]
    }
  })
  useEffect(() => {
    const reader = new FileReader();
    setLoadingImg(true);
    reader.onloadend = () => {
      setLoadingImg(false);
      setImageSrc(reader.result as string);
    }
    if (imageData.data) {
      reader.readAsDataURL(imageData.data as Blob);
    }
  }, [imageData.data]);

  useEffect(() => {
    // Component Mount
    async function fetchTemplateData() {
      setLoading(true);
      const templatesResult = await apiClient.get<Models.GetTemplatesResponse>('/api/templates');
      setLoading(false);
      if (templatesResult.success) {
        setTagState({
          ...templatesResult.data
        });
      }
    }
    fetchTemplateData();
    return;
  }, []);

  const createProduct = async (values: ProductForm) => {
    setLoading(true);
    try {
      const result = await apiClient.post('/api/products', values, {
        'Content-Type': 'multipart/form-data'
      });
      setLoading(false)
      if (result.data && result.success) {
        onBack();
      }
    } catch(error) {
      setLoading(false);
    }
  };
  const steps = getSteps();
  const initialValues: ProductForm = {
    details: {
      name: '',
      category: '',
      brand: '',
      supplier: '',
      expDate: null,
      creationDate: null,
      unit: Constants.UnitEnum.UNIDAD,
      sku: '',
      description: '',
      barcode: '',
      qrCodeUrl: '',
      prices: {
        cost: 0,
        price: 0,
        affiliatePrice: 0,
        margin: 0
      }
    },
    tags: {
      TWO_ONE_INCHES: {
        template: TemplateTypes.BASIC,
        quantity: 0,
        templateId: ''
      },
      TWO_SIX_INCHES: {
        template: TemplateTypes.BASIC,
        quantity: 0,
        templateId: ''
      },
      FOUR_TWO_INCHES: {
        template: TemplateTypes.BASIC,
        quantity: 0,
        templateId: ''

      }
    }
  }
  
  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function renderProductDetails(values: ProductForm, errors: FormikErrors<ProductForm>, touched: FormikTouched<ProductForm>, handleChange: any, handleBlur: any, setFieldValue: any) {
    return (
      <Grid container spacing={3} justify="space-between" alignItems="center">
      <Grid item xs={4}/>
      <Grid item xs={4} alignItems="center">
        <Card variant="outlined" className={selfClasses.imageContainer}>
          <CardContent>
              <input
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: 'none' }}
                id="submit-button-file"
                multiple
                type="file"
                name="details.image"
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    setFieldValue('details.image', event.currentTarget.files[0] as File);
                    setImageData({
                      ...imageData,
                      data: event.currentTarget.files[0]
                    });
                  }
                }}
              />
              <label htmlFor="submit-button-file">
                <Button component="span" variant="contained" color="primary" className={selfClasses.button}>
                  Seleccionar Imagen
                </Button>
              </label>
              {values.details.image ? 
                <Typography variant="body1" color="textSecondary">{`${values.details.image.name}`}</Typography>
                : null }
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}/>
      <Grid item xs={4} className={selfClasses.gridItemContainer}>
        <Card variant="outlined" className={selfClasses.cardContainer}>
          <CardContent>
            <div className={selfClasses.cardContainer}>
              <Typography className={selfClasses.cardTitle} color="textSecondary" gutterBottom>
                Producto
              </Typography>
              <TextField
                label="Nombre"
                name="details.name"
                placeholder="Texto que aparecerá en el tag."
                fullWidth
                onBlur={handleBlur}
                value={values.details.name}
                onChange={handleChange}
                required
                error={Boolean(errors && errors.details && errors.details.name && touched.details && touched.details!.name)}
                helperText={errors && errors.details && errors.details.name && touched.details && touched.details!.name ? errors.details.name : undefined}
              />
              <TextField 
                label="Categoría"
                placeholder="Categoría"
                margin="normal"
                name="details.category"
                value={values.details.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors && errors.details && errors.details.category && touched.details && touched.details!.category)}
                helperText={errors && errors.details && errors.details.category && touched.details && touched.details!.category ? errors.details.category : undefined}
                fullWidth
                required
              />
              <TextField 
                label="Marca"
                placeholder="Marca Comercial"
                margin="normal"
                name="details.brand"
                value={values.details.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors && errors.details && errors.details.brand && touched.details && touched.details!.brand)}
                helperText={errors && errors.details && errors.details.brand && touched.details && touched.details!.brand ? errors.details.brand : undefined}
                fullWidth
                required
              />
              <TextField
                placeholder="Razón Social"
                label="Proveedor"
                name={"details.supplier"}
                value={values.details.supplier}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors && errors.details && errors.details.supplier && touched.details && touched.details!.supplier)}
                helperText={errors && errors.details && errors.details.supplier && touched.details && touched.details!.supplier ? errors.details.supplier : undefined}
                required
                fullWidth
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} className={selfClasses.gridItemContainer}>
        <Card variant="outlined" className={selfClasses.cardContainer} raised>
          <CardContent>
            <div className={selfClasses.cardContainer}>
              <Typography className={selfClasses.cardTitle} color="textSecondary" gutterBottom>
                Precios
              </Typography>
              <Input
                className={selfClasses.numberInputMargin}
                placeholder="Costo"
                fullWidth
                margin="dense"
                name="details.prices.cost"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.details.prices.cost ? values.details.prices.cost : ''}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                error={Boolean(errors.details && errors.details.prices && errors.details.prices.cost && touched.details && touched.details.prices && touched.details.prices.cost)}
                required
              />
              <Input 
                className={selfClasses.numberInputMargin}
                placeholder="Precio"
                fullWidth
                margin="dense"
                name="details.prices.price"
                value={values.details.prices.price ? values.details.prices.price : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.details && errors.details.prices && errors.details.prices.price && touched.details && touched.details.prices && touched.details.prices.price)}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              <Input 
                className={selfClasses.numberInputMargin}
                placeholder="Precio Afiliado"
                fullWidth
                margin="dense"
                name="details.prices.affiliatePrice"
                value={values.details.prices.affiliatePrice ? values.details.prices.affiliatePrice: ''}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              <Input 
                className={selfClasses.numberInputMargin}
                placeholder="Márgen de Utilidad"
                fullWidth
                margin="dense"
                name="details.prices.margin"
                value={values.details.prices.margin ? values.details.prices.margin : ''}
                onChange={handleChange}
                onBlur={handleBlur}
                startAdornment={<InputAdornment position="start">%</InputAdornment>}
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} className={selfClasses.gridItemContainer}>
        <Card variant="outlined" className={selfClasses.cardContainer}>
          <CardContent>
            <div className={selfClasses.cardContainer}>
              <Typography className={selfClasses.cardTitle} color="textSecondary" gutterBottom>
                Más Información
              </Typography>
              <TextField
                label="Fecha de Expiración"
                type="date"
                fullWidth
                name="details.expDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.details.expDate}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                placeholder="Fecha de Ingreso"
                label="Fecha de Ingreso"
                type="date"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={values.details.creationDate}
                name="details.creationDate"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <Select
                label="Unidad"
                labelId="unidad-select"
                id="unidad-select"
                value={values.details.unit}
                name="details.unit"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <MenuItem value={Constants.UnitEnum.UNIDAD}>Unidad</MenuItem>
                <MenuItem value={Constants.UnitEnum.GRAMOS}>Gramos</MenuItem>
                <MenuItem value={Constants.UnitEnum.KILOS}>Kilos</MenuItem>
                <MenuItem value={Constants.UnitEnum.METRO}>Metro</MenuItem>
              </Select>
              <TextField 
                label="SKU"
                placeholder="Código único del producto en tu sistema comercial."
                fullWidth
                name="details.sku"
                value={values.details.sku}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        {/* Ventas Cruzadas - Sugerencias */}
        <Typography className={selfClasses.descriptionTitle} color="textSecondary" gutterBottom>
          Descripción
        </Typography>
        <TextField 
          id="outlined-multiline-static"
          fullWidth
          placeholder="Información adicional del producto, exhibición, perchas, tasa de descuento, etc."
          multiline
          rows="4"
          variant="outlined"
          className={selfClasses.descriptionContainer}
          value={values.details.description}
          name="details.description"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography className={selfClasses.descriptionTitle} color="textSecondary" gutterBottom>
          Códigos Adicionales
        </Typography>
        <div className={selfClasses.codeContainer}>
          <TextField 
            margin="normal"
            label="Código QR (URL)"
            style={{ width: "60%" }}
            value={values.details.qrCodeUrl}
            name="details.qrCodeUrl"
            onChange={handleChange}
          />
          <Button color="secondary" variant="outlined" size="small" style={{ marginTop: "1.5rem", marginLeft: "1rem" }} onClick={() => {
            setUrls({
              ...urls,
              qrCodeUrl: values.details.qrCodeUrl
            });
          }}>
            Generar
          </Button>

        </div>
        <div className={selfClasses.codeContainer}>
          <TextField 
            margin="normal"
            label="Código de Barras"
            style={{ width: "60%" }}
            value={values.details.barcode}
            name="details.barcode"
            onChange={handleChange}
          />
          <Button variant="outlined" color="secondary" size="small" style={{ marginTop: "1.5rem", marginLeft: "1rem"}} onClick={() => {
            setUrls({
              ...urls,
              barcode: values.details.barcode
            })
          }}>
            Generar
          </Button>
        </div>
      </Grid>
      <Grid item xs={2}>
          <div>
            {
              urls.qrCodeUrl &&
              <QRCode value={urls.qrCodeUrl}/>
            }
          </div>
          <div>
            {
              urls.barcode &&
              <Barcode value={urls.barcode} height={50} width={1} marginRight={30} marginTop={20}/>
            }
          </div>
      </Grid>
    </Grid>
    )
  }

  function renderTagSelection(values: ProductForm, handleChange: any) {
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Tag
              </TableCell>
              <TableCell>
                Tamaño
              </TableCell>
              <TableCell>
                Plantilla
              </TableCell>
              <TableCell>
                Disponbiles
              </TableCell>
              <TableCell>
                Cantidad
              </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <img src="/images/tags/2.13.png" style={{ width: '150px', height: '150px'}}/>
                </TableCell>
                <TableCell>
                    2.1"
                </TableCell>
                <TableCell>
                  <Select
                    label="Plantilla"
                    labelId="two-one-simple-select-label"
                    id="two-one-simple-select"
                    value={values.tags.TWO_ONE_INCHES.template}
                    name="tags.TWO_ONE_INCHES.template"
                    onChange={handleChange}
                  >
                    {tagState.TWO_ONE_INCHES.templates.map((template) => {
                      return <MenuItem value={template.templateId}>{template.templateName}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell>
                  2
                </TableCell>
                <TableCell>
                  <TextField 
                    placeholder="Número de Tags"
                    type="number"
                    value={values.tags.TWO_ONE_INCHES.quantity}
                    name="tags.TWO_ONE_INCHES.quantity"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img src="/images/tags/2.6.png" style={{ width: '150px', height: '150px'}}/>
                </TableCell>
                <TableCell>
                    2.6"
                </TableCell>
                <TableCell>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.tags.TWO_SIX_INCHES.template}
                    name="tags.TWO_SIX_INCHES.template"
                    onChange={handleChange}
                  >
                    {tagState.TWO_SIX_INCHES.templates.map((template) => {
                      return <MenuItem value={template.templateId}>{template.templateName}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell>
                  2
                </TableCell>
                <TableCell>
                  <TextField 
                    placeholder="Número de Tags"
                    type="number"
                    value={values.tags.TWO_SIX_INCHES.quantity}
                    name="tags.TWO_SIX_INCHES.quantity"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <img src="/images/tags/4.2.png" style={{ width: '150px', height: '150px'}}/>
                </TableCell>
                <TableCell>
                    4.2"
                </TableCell>
                <TableCell>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.tags.FOUR_TWO_INCHES.template}
                    name="tags.FOUR_TWO_INCHES.template"
                    onChange={handleChange}
                  >
                    {tagState.FOUR_TWO_INCHES.templates.map((template) => {
                      return <MenuItem value={template.templateId}>{template.templateName}</MenuItem>
                    })}
                  </Select>
                </TableCell>
                <TableCell>
                  2
                </TableCell>
                <TableCell>
                  <TextField 
                    placeholder="Número de Tags"
                    type="number"
                    value={values.tags.FOUR_TWO_INCHES.quantity}
                    name="tags.FOUR_TWO_INCHES.quantity"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
        </Table>
      </div>
    );
  }

  function renderConfirmationPage(values: ProductForm) {
    return (
      <div>
        <Typography variant="h2" className={selfClasses.confirmationTitleText}> Confirmación </Typography>
          <Grid container spacing={3} justify="space-between" alignItems="center">
            <Grid xs={2} item>
              <Typography variant="h3" className={selfClasses.confirmationTitleSection} gutterBottom color="textPrimary"> Detalles de Producto </Typography>
            </Grid>
            <Grid xs={2}/>
            <Grid xs={6} item>
                <Card>
                  <CardHeader title={values.details.name} subheader={`${values.details.brand}-${values.details.category}`}/>
                  { !imageSrc && loadingImage && <CircularProgress size={"80"} color="secondary" />}
                  { imageSrc && !loadingImage && 
                    <CardMedia 
                      title={values.details.name}
                      component="img"
                      height="250"
                      src={imageSrc}
                    />
                  }
                  <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                      <Typography variant="body1" color="textSecondary">
                        {`PVP: $${values.details.prices.price}`}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {`Precio Afiliado: $${values.details.prices.affiliatePrice}`}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {`Costo: $${values.details.prices.cost}`}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body1" color="textSecondary">
                        {`Fecha de Expiración: ${values.details.expDate}`}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {`Fecha de Ingreso: ${values.details.creationDate}`}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {`SKU: ${values.details.sku}`}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
            </Grid>
            <Grid xs={2}/>
          <Grid item xs={12}>
            <Divider variant="middle"/>
          </Grid>
          <Grid xs={2}>
            <Typography variant="h3" className={selfClasses.confirmationTitleSection} gutterBottom color="textPrimary"> Selección de Tags </Typography>
          </Grid>
          <Grid xs={9}>
            <Table className={selfClasses.tableStyles}>
            <TableHead>
              <TableRow>
                <TableCell>
                  Imagen
                </TableCell>
                <TableCell>
                  Tamaño
                </TableCell>
                <TableCell>
                  Plantilla
                </TableCell>
                <TableCell>
                  Cantidad
                </TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(values.tags).map((tagName) => {
                  const body = (values.tags as any)[tagName];
                  const tagDetails = (TAG_DETAILS as any)[tagName];
                  return (
                    <TableRow>
                      <TableCell>
                        <img src={tagDetails.imageUrl} style={{ width: '150px', height: '150px'}}/>
                      </TableCell>
                      <TableCell>
                          {tagDetails.name}
                      </TableCell>
                      <TableCell>
                        {body.template}
                      </TableCell>
                      <TableCell>
                        {body.quantity}
                      </TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>
          </Grid>
          <Grid xs={1}/>
          </Grid>
      </div>
    )
  }
  const handleBack = () => {
    if (activeStep === 0) {
      // Need to go back to list page
      onBack();
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  const handleReset = () => {
    setActiveStep(0);
  }

  const getStepContent = (step: number, values: ProductForm, errors: FormikErrors<ProductForm>, touched: FormikTouched<ProductForm>, handleChange: any, handleBlur: any, setFieldValue: any) => {
    switch(step) {
      case 0:
        return renderProductDetails(values, errors, touched, handleChange, handleBlur, setFieldValue);
      case 1:
        return renderTagSelection(values, handleChange);
      case 2:
        return renderConfirmationPage(values);
      default:
        return null;
    }
  }

  const getValidators = (step: number) => {
    switch(step) {
      case 0:
        const schema = Yup.object().shape<ProductForm>({
            details: Yup.object().shape({
              name: Yup.string().required('Nombre Requerido.'),
              category: Yup.string().required('Categoría Requerida.'),
              brand: Yup.string().required('Marca Requerida.'),
              supplier: Yup.string().required('Proveedor Requerido.'),
              image: Yup.mixed(),
              expDate: Yup.date(),
              creationDate: Yup.date().required('Fecha de Ingreso inválida'),
              unit: Yup.mixed().oneOf([Constants.UnitEnum.GRAMOS, Constants.UnitEnum.KILOS, Constants.UnitEnum.UNIDAD, Constants.UnitEnum.METRO]).required('Unidad Inválida'),
              sku: Yup.string().required('SKU Requerido'),
              description: Yup.string(),
              barcode: Yup.string(),
              qrCodeUrl: Yup.string().url('URL Inválido'),
              prices: Yup.object().shape({
                cost: Yup.number().required('Costo Requerido'),
                price: Yup.number().required('Precio Requerido'),
                affiliatePrice: Yup.number(),
                margin: Yup.number()
              })
            }),
            tags: Yup.object()
        });
        return schema;
      case 1:
        const tagSchema = Yup.object().shape<ProductForm>({
          details: Yup.object(),
          tags: Yup.object().shape<TagsForm>({
            TWO_ONE_INCHES: Yup.object().shape({
              templateId: Yup.string().required(),
              template: Yup.mixed().oneOf([TemplateTypes.BASIC, TemplateTypes.SALE]),
              quantity: Yup.number()
            }),
            TWO_SIX_INCHES: Yup.object().shape({
              templateId: Yup.string().required(),
              template: Yup.mixed().oneOf([TemplateTypes.BASIC, TemplateTypes.SALE]),
              quantity: Yup.number()
            }),
            FOUR_TWO_INCHES: Yup.object().shape({
              templateId: Yup.string().required(),
              template: Yup.mixed().oneOf([TemplateTypes.BASIC, TemplateTypes.SALE]),
              quantity: Yup.number()
            })
          })
        });
        return tagSchema;
      default:
        return null;
    }
  };

  const isInvalidNextButton = (step: number, errors: FormikErrors<ProductForm>) => {
    switch(step) {
      case 0: {
        const { details: detailsErrors } = errors;
        if (!detailsErrors) {
          return false;
        }
        const errorKeys = detailsErrors ? Object.keys(detailsErrors) : [];
        const isInvalid = errorKeys.reduce((prevValue, errorKey) => {
          const error = detailsErrors ? (detailsErrors as any)[errorKey] : false;
          return !!error || prevValue;
        }, true);
        return isInvalid;
      };
      default:
        return true;
    }
  };

  return (
  <div className={classes.root}>
    <Formik initialValues={initialValues} 
      validationSchema={getValidators(activeStep)}
      onSubmit={() => {
      alert('Submit product Form')
    }}>
      {({ values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
        <>
          <Typography className={selfClasses.title} variant="h3">Crear Producto</Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Paper elevation={0}>
              {getStepContent(activeStep, values, errors, touched, handleChange, handleBlur, setFieldValue)}
          </Paper>
          <div className={selfClasses.bottomButtons}>
            {
              activeStep === steps.length ? (
                <div>
                  <Typography variant="h5" className={selfClasses.instructions}>
                    Proceso Finalizado!
                  </Typography>
                  <Button onClick={handleReset} className={selfClasses.button}>
                    Reiniciar
                  </Button>
                </div>
              ): (
                <div>
                  <div className={selfClasses.buttonContainer}>
                    <Button onClick={handleBack} className={classes.button}>
                      Atrás
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={async () => {
                        if (activeStep === steps.length - 1) {
                          handleSubmit();
                          await createProduct(values);
                        } else {
                          handleNext();
                        }
                      }}
                      className={classes.button}
                      disabled={isSubmitting || loading || isInvalidNextButton(activeStep, errors) || Object.keys(touched).length === 0}
                    >
                      {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              )
            }
          </div>
        </>
      )}
    </Formik>
  </div>
  );
}

 