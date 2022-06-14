import Link from 'next/link';
import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Slide, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import Layout from '../components/Layout'
import getCommerce from '../utils/commerce'

export default function Home(props) {

   const { products } = props

   console.log(products)

   return (
      <Layout title='Home' commercePublicKey={props.commercePublicKey}>
         {products.length === 0 && <Alert>No product found</Alert>}
         <Grid container spacing={5}>
            {products.map(product => (
               <Grid key={product.id} item md={3}>
                  <Slide direction="down" in={true}>
                     <Card>
                        <Link href={`/products/${product.permalink}`}>
                           <CardActionArea>
                              <CardMedia
                                 component="img"
                                 alt={product.name}
                                 image={product.image.url}
                              />
                              <CardContent>
                                 <Typography
                                    gutterBottom
                                    variant="body2"
                                    color="textPrimary"
                                    component="p"
                                 >
                                    {product.name}
                                 </Typography>
                                 <Box>
                                    <Typography
                                       variant="body1"
                                       color="textPrimary"
                                       component="p"
                                    >
                                       {product.price.formatted_with_symbol}
                                    </Typography>
                                 </Box>
                              </CardContent>
                           </CardActionArea>
                        </Link>
                     </Card>
                  </Slide>
               </Grid>
            ))}
         </Grid>
      </Layout>
   )
}

export async function getStaticProps() {
   const commerce = getCommerce()
   const { data: products } = await commerce.products.list()
   return {
      props: {
         products
      }
   }
}