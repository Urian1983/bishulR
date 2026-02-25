package com.example.eCommerceDemo.dataLoader;

import com.example.eCommerceDemo.model.Product;
import com.example.eCommerceDemo.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final ProductRepository productRepository;

    public DataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() > 0) {
            return;
        }

        List<Product> products = List.of(
                createProduct("P001", "Paella Valenciana", "Arroces del Mediterráneo", "Auténtica paella valenciana con pollo, conejo y judías verdes cocinada en leña", "La paella más auténtica del Levante", "Arroces", 10, 14.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Paella_de_Valencia.jpg/1280px-Paella_de_Valencia.jpg"),
                createProduct("P002", "Arroz Negro", "Arroces del Mediterráneo", "Arroz negro con sepia y gambas, alioli casero incluido", "Arroz negro con todo el sabor del mar", "Arroces", 8, 13.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Arroz_negro.jpg/1280px-Arroz_negro.jpg"),
                createProduct("P003", "Fideuà", "Arroces del Mediterráneo", "Fideuà tradicional con mariscos y caldo de pescado casero", "La fideuà más cremosa del puerto", "Arroces", 8, 13.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Fideua.jpg/1280px-Fideua.jpg"),
                createProduct("P004", "Arroz a Banda", "Arroces del Mediterráneo", "Arroz cocinado en fumet de pescado con ali-i-oli", "Arroz meloso con sabor a mar", "Arroces", 9, 12.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Arroz_a_banda.jpg/1280px-Arroz_a_banda.jpg"),
                createProduct("P005", "Gazpacho Andaluz", "Sabores del Sur", "Refrescante gazpacho andaluz con tomate, pepino y pimiento natural", "Gazpacho fresco y natural", "Sopas", 15, 6.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Gazpacho_andaluz.jpg/1280px-Gazpacho_andaluz.jpg"),
                createProduct("P006", "Salmorejo Cordobés", "Sabores del Sur", "Cremoso salmorejo cordobés con huevo duro y jamón serrano", "Salmorejo auténtico cordobés", "Sopas", 15, 7.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Salmorejo.jpg/1280px-Salmorejo.jpg"),
                createProduct("P007", "Sopa de Pescado", "Mar y Montaña", "Sopa de pescado con rape, mejillones y gambas en caldo casero", "Sopa de pescado reconfortante", "Sopas", 12, 9.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Sopa_de_pescado.jpg/1280px-Sopa_de_pescado.jpg"),
                createProduct("P008", "Bouillabaisse", "Cocina Provenzal", "Tradicional guiso marsellés de pescados y mariscos con rouille", "El guiso de pescado más famoso de Provenza", "Sopas", 6, 16.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Bouillabaisse.jpg/1280px-Bouillabaisse.jpg"),
                createProduct("P009", "Hummus Casero", "Sabores de Oriente", "Hummus cremoso de garbanzos con aceite de oliva virgen y pimentón", "Hummus suave y cremoso", "Entrantes", 20, 6.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Hummus_from_The_Arabian_Food.jpg/1280px-Hummus_from_The_Arabian_Food.jpg"),
                createProduct("P010", "Falafel con Tahini", "Sabores de Oriente", "Falafel crujiente de garbanzos y hierbas con salsa de tahini", "Falafel crujiente por fuera y tierno por dentro", "Entrantes", 18, 8.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Falafel_2.jpg/1280px-Falafel_2.jpg"),
                createProduct("P011", "Ensalada Griega", "Cocina Helénica", "Ensalada con tomate, pepino, aceitunas kalamata, cebolla y queso feta", "Fresca ensalada griega tradicional", "Ensaladas", 20, 8.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Greek_salad.jpg/1280px-Greek_salad.jpg"),
                createProduct("P012", "Tabulé", "Sabores de Oriente", "Ensalada de bulgur con perejil, tomate, menta y limón", "Tabulé fresco y aromático", "Ensaladas", 18, 7.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Tabbouleh_01.jpg/1280px-Tabbouleh_01.jpg"),
                createProduct("P013", "Ensalada Caprese", "Cocina Italiana", "Mozzarella fresca, tomate de temporada y albahaca con aceite de oliva", "La simplicidad italiana en su máxima expresión", "Ensaladas", 15, 9.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Salad_caprese.jpg/1280px-Salad_caprese.jpg"),
                createProduct("P014", "Pulpo a la Gallega", "Mar y Montaña", "Pulpo cocido con pimentón de la Vera, aceite de oliva y sal gruesa", "Pulpo tierno con el mejor pimentón", "Pescados y Mariscos", 10, 15.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Pulpo_a_la_gallega.jpg/1280px-Pulpo_a_la_gallega.jpg"),
                createProduct("P015", "Gambas al Ajillo", "Mar y Montaña", "Gambas salteadas en aceite de oliva con ajo y guindilla", "Gambas jugosas con el mejor aceite", "Pescados y Mariscos", 14, 12.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Gambas_al_ajillo.jpg/1280px-Gambas_al_ajillo.jpg"),
                createProduct("P016", "Boquerones en Vinagre", "Sabores del Sur", "Boquerones marinados en vinagre con ajo y perejil fresco", "Boquerones frescos marinados al momento", "Pescados y Mariscos", 16, 8.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Boquerones_en_vinagre.jpg/1280px-Boquerones_en_vinagre.jpg"),
                createProduct("P017", "Bacalao a la Vizcaína", "Cocina Vasca", "Bacalao desalado con salsa vizcaína de pimientos choriceros y cebolla", "Bacalao con la salsa más tradicional del País Vasco", "Pescados y Mariscos", 8, 16.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bacalao_a_la_vizcaina.jpg/1280px-Bacalao_a_la_vizcaina.jpg"),
                createProduct("P018", "Dorada a la Sal", "Mar y Montaña", "Dorada entera cocinada en costra de sal con hierbas mediterráneas", "Dorada jugosa y llena de sabor", "Pescados y Mariscos", 7, 18.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Dorada_a_la_sal.jpg/1280px-Dorada_a_la_sal.jpg"),
                createProduct("P019", "Calamares a la Romana", "Mar y Montaña", "Calamares frescos rebozados y fritos con limón y alioli", "Calamares crujientes recién fritos", "Pescados y Mariscos", 14, 10.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Calamares_a_la_romana.jpg/1280px-Calamares_a_la_romana.jpg"),
                createProduct("P020", "Moussaka", "Cocina Helénica", "Capas de berenjena, carne picada especiada y bechamel gratinada al horno", "La moussaka más auténtica de Grecia", "Carnes", 9, 13.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Moussaka.jpg/1280px-Moussaka.jpg"),
                createProduct("P021", "Kebab de Cordero", "Sabores de Oriente", "Brocheta de cordero especiado a la plancha con salsa de yogur y menta", "Kebab jugoso con especias del Mediterráneo oriental", "Carnes", 10, 14.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Seekh_kebabs.jpg/1280px-Seekh_kebabs.jpg"),
                createProduct("P022", "Pollo al Limón", "Cocina Helénica", "Muslos de pollo asados con limón, orégano y aceite de oliva", "Pollo jugoso con aromas mediterráneos", "Carnes", 12, 12.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Roasted_chicken.jpg/1280px-Roasted_chicken.jpg"),
                createProduct("P023", "Conejo al Ajillo", "Mar y Montaña", "Conejo troceado guisado con ajo, vino blanco y hierbas aromáticas", "Conejo tierno con todo el sabor de la montaña", "Carnes", 8, 13.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Rabbit_stew.jpg/1280px-Rabbit_stew.jpg"),
                createProduct("P024", "Albóndigas en Salsa", "Cocina de la Abuela", "Albóndigas caseras de ternera en salsa de tomate y hierbas", "Albóndigas tiernas en salsa tradicional", "Carnes", 14, 11.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Albondigas.jpg/1280px-Albondigas.jpg"),
                createProduct("P025", "Ratatouille", "Cocina Provenzal", "Verduras de temporada guisadas lentamente con hierbas de Provenza", "El guiso de verduras más famoso de Francia", "Verduras", 15, 10.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Ratatouille.jpg/1280px-Ratatouille.jpg"),
                createProduct("P026", "Pisto Manchego", "Cocina de la Abuela", "Pisto tradicional con tomate, calabacín, pimiento y cebolla", "Pisto casero con verduras de temporada", "Verduras", 16, 9.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pisto_manchego.jpg/1280px-Pisto_manchego.jpg"),
                createProduct("P027", "Berenjenas Rellenas", "Cocina Mediterránea", "Berenjenas rellenas de carne picada, tomate y queso gratinado", "Berenjenas jugosas con relleno sabroso", "Verduras", 10, 11.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Stuffed_eggplant.jpg/1280px-Stuffed_eggplant.jpg"),
                createProduct("P028", "Escalivada", "Cocina Catalana", "Berenjena y pimiento asados al horno con aceite de oliva y sal", "Verduras asadas con el sabor más puro", "Verduras", 14, 8.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Escalivada.jpg/1280px-Escalivada.jpg"),
                createProduct("P029", "Pasta al Pomodoro", "Cocina Italiana", "Espaguetis con salsa de tomate fresco, albahaca y parmesano", "La pasta más sencilla y deliciosa de Italia", "Pastas", 16, 9.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Spaghetti_al_pomodoro.jpg/1280px-Spaghetti_al_pomodoro.jpg"),
                createProduct("P030", "Pasta Carbonara", "Cocina Italiana", "Espaguetis con panceta, huevo, parmesano y pimienta negra", "Carbonara cremosa sin nata, como en Roma", "Pastas", 14, 11.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_pasta_carbonara.jpg/1280px-Fresh_made_pasta_carbonara.jpg"),
                createProduct("P031", "Lasaña de Verduras", "Cocina Italiana", "Lasaña con capas de verduras asadas, bechamel y mozzarella", "Lasaña vegetariana llena de sabor", "Pastas", 10, 12.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lasagna.jpg/1280px-Lasagna.jpg"),
                createProduct("P032", "Risotto de Setas", "Cocina Italiana", "Risotto cremoso con setas variadas, parmesano y trufa negra", "Risotto meloso con el aroma de la trufa", "Arroces", 8, 14.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Mushroom_risotto.jpg/1280px-Mushroom_risotto.jpg"),
                createProduct("P033", "Pizza Margherita", "Cocina Italiana", "Pizza napolitana con salsa de tomate, mozzarella fresca y albahaca", "La pizza más clásica de Nápoles", "Pizzas", 15, 10.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Eq_it-na_pizza-margherita_sep2005_sml.jpg/1280px-Eq_it-na_pizza-margherita_sep2005_sml.jpg"),
                createProduct("P034", "Pizza de Verduras", "Cocina Italiana", "Pizza con pimientos, cebolla, champiñones, aceitunas y mozzarella", "Pizza vegetariana con lo mejor del huerto", "Pizzas", 13, 11.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1280px-Pizza-3007395.jpg"),
                createProduct("P035", "Shawarma de Pollo", "Sabores de Oriente", "Pollo marinado con especias árabes envuelto en pan de pita con verduras", "Shawarma jugoso con especias del Levante", "Entrantes", 16, 9.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Shawarma_wrap.jpg/1280px-Shawarma_wrap.jpg"),
                createProduct("P036", "Spanakopita", "Cocina Helénica", "Hojaldre relleno de espinacas y queso feta con hierbas", "El pastel de espinacas más famoso de Grecia", "Entrantes", 12, 8.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Spanakopita.jpg/1280px-Spanakopita.jpg"),
                createProduct("P037", "Dolmades", "Cocina Helénica", "Hojas de parra rellenas de arroz, piñones y hierbas aromáticas", "Dolmades tiernos con el sabor de Grecia", "Entrantes", 14, 9.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Dolmades.jpg/1280px-Dolmades.jpg"),
                createProduct("P038", "Patatas Bravas", "Sabores del Sur", "Patatas fritas crujientes con salsa brava picante y alioli", "Las patatas bravas más crujientes", "Tapas", 20, 6.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Patatas_bravas.jpg/1280px-Patatas_bravas.jpg"),
                createProduct("P039", "Pan con Tomate", "Cocina Catalana", "Pan de cristal tostado con tomate rallado, aceite de oliva y sal", "El desayuno catalán más tradicional", "Tapas", 25, 4.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Pa_amb_tomaquet.jpg/1280px-Pa_amb_tomaquet.jpg"),
                createProduct("P040", "Croquetas de Bacalao", "Cocina Vasca", "Cremosas croquetas de bacalao desalado rebozadas y fritas al momento", "Croquetas de bacalao con bechamel casera", "Tapas", 20, 8.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Croquetas_de_jam%C3%B3n.jpg/1280px-Croquetas_de_jam%C3%B3n.jpg"),
                createProduct("P041", "Tiramisu", "Cocina Italiana", "Clásico tiramisú italiano con mascarpone, café y bizcochos de soletilla", "El postre italiano más famoso del mundo", "Postres", 18, 6.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tiramisu_-_Raffaele_Diomede.jpg/1280px-Tiramisu_-_Raffaele_Diomede.jpg"),
                createProduct("P042", "Baklava", "Sabores de Oriente", "Hojaldre crujiente relleno de frutos secos con almíbar de miel y rosas", "Baklava crujiente con almíbar de flor de azahar", "Postres", 16, 5.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Baklava_-_Turkish_special%2C_80-ply.JPEG/1280px-Baklava_-_Turkish_special%2C_80-ply.JPEG"),
                createProduct("P043", "Panna Cotta", "Cocina Italiana", "Panna cotta de vainilla con coulis de frutos rojos", "Panna cotta suave con frutos rojos de temporada", "Postres", 15, 5.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Panna_cotta.jpg/1280px-Panna_cotta.jpg"),
                createProduct("P044", "Crema Catalana", "Cocina Catalana", "Crema pastelera con corteza de naranja y limón gratinada con azúcar", "La crema catalana más suave y cremosa", "Postres", 18, 5.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Crema_catalana.jpg/1280px-Crema_catalana.jpg"),
                createProduct("P045", "Helado de Pistachos", "Sabores de Oriente", "Helado artesanal de pistachos sicilianos con agua de azahar", "Helado cremoso con el mejor pistacho de Sicilia", "Postres", 20, 4.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Pistachio_ice_cream.jpg/1280px-Pistachio_ice_cream.jpg"),
                createProduct("P046", "Limonada de Menta", "Bebidas del Mediterráneo", "Limonada fresca con limones naturales, menta y un toque de miel", "Limonada refrescante con hierbas frescas", "Bebidas", 30, 3.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lemonade.jpg/1280px-Lemonade.jpg"),
                createProduct("P047", "Agua de Valencia", "Bebidas del Mediterráneo", "Cóctel valenciano con cava, naranja natural, vodka y ginebra", "El cóctel más famoso de Valencia", "Bebidas", 20, 5.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Agua_de_Valencia.jpg/1280px-Agua_de_Valencia.jpg"),
                createProduct("P048", "Té de Menta Marroquí", "Sabores de Oriente", "Té verde con menta fresca y azúcar al estilo marroquí tradicional", "Té aromático servido en vaso tradicional", "Bebidas", 25, 3.00, "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Moroccan_tea.jpg/1280px-Moroccan_tea.jpg"),
                createProduct("P049", "Sangría Mediterránea", "Bebidas del Mediterráneo", "Sangría con vino tinto, frutas de temporada, canela y naranja", "Sangría fresca con frutas mediterráneas", "Bebidas", 20, 5.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Sangria.jpg/1280px-Sangria.jpg"),
                createProduct("P050", "Horchata de Chufa", "Bebidas del Mediterráneo", "Horchata natural de chufa valenciana bien fresquita con fartons", "La horchata más fresca de Valencia", "Bebidas", 25, 3.50, "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Horchata.jpg/1280px-Horchata.jpg")
        );

        productRepository.saveAll(products);
    }

    private Product createProduct(String sku, String name, String brand, String description,
                                  String shortDescription, String category, int stock,
                                  double price, String imageUrl) {
        Product product = new Product();
        product.setSku(sku);
        product.setName(name);
        product.setSlug(name.toLowerCase().replace(" ", "-"));
        product.setBrand(brand);
        product.setDescription(description);
        product.setShortDescription(shortDescription);
        product.setCategory(category);
        product.setStock(stock);
        product.setPrice(BigDecimal.valueOf(price));
        product.setImageUrl(imageUrl);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return product;
    }
}

