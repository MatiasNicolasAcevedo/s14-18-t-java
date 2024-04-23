package com.awaregaming.AwareGaming.utils;

import com.awaregaming.AwareGaming.model.Comment;
import com.awaregaming.AwareGaming.model.Enum.Role;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.model.User;
import com.awaregaming.AwareGaming.repository.ICommentRepository;
import com.awaregaming.AwareGaming.repository.IPostsRepository;
import com.awaregaming.AwareGaming.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IPostsRepository postsRepository;

    @Autowired
    private ICommentRepository commentRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserData userData;

    @Override
    public void run(String... args) throws Exception {
        loadData();
    }

    private void loadData() {

        if(userRepository.count()==0){

            //User 1
            User user1 = new User();
            user1.setFirstName("Mónica");
            user1.setLastName("Velarde");
            user1.setEmail("monicavelarde@gmail.com");
            user1.setPassword(passwordEncoder.encode("user1"));
            user1.setDni("1234567890");
            user1.setCredits(1000);
            user1.setRole(Role.USER);
            user1.setAge(62);
            user1.setActive(true);

            userRepository.save(user1);

            //User 2
            User user2 = new User();
            user2.setFirstName("Lionel");
            user2.setLastName("Messi");
            user2.setEmail("leomessi@gmail.com");
            user2.setPassword(passwordEncoder.encode("user2"));
            user2.setDni("1234567891");
            user2.setCredits(1000);
            user2.setRole(Role.USER);
            user2.setAge(36);
            user2.setActive(true);
            userRepository.save(user2);

            //User 3
            User user3 = new User();
            user3.setFirstName("Lucas");
            user3.setLastName("Caro");
            user3.setEmail("lucascaro@gmail.com");
            user3.setPassword(passwordEncoder.encode("user3"));
            user3.setDni("1234567898");
            user3.setCredits(1000);
            user3.setRole(Role.USER);
            user3.setAge(32);
            user3.setActive(true);
            userRepository.save(user3);

            //User 4
            User user4 = new User();
            user4.setFirstName("Ruben");
            user4.setLastName("Ledesma");
            user4.setEmail("ruben@gmail.com");
            user4.setPassword(passwordEncoder.encode("user4"));
            user4.setDni("1234567892");
            user4.setCredits(1000);
            user4.setRole(Role.USER);
            user4.setAge(27);
            user4.setActive(true);
            userRepository.save(user4);

            //User 5
            User user5 = new User();
            user5.setFirstName("Lucas");
            user5.setLastName("Ledesma");
            user5.setEmail("lucas@gmail.com");
            user5.setPassword(passwordEncoder.encode("user5"));
            user5.setDni("1234567893");
            user5.setCredits(1000);
            user5.setRole(Role.USER);
            user5.setAge(29);
            user5.setActive(true);
            userRepository.save(user5);

            //User 6
            User user6 = new User();
            user6.setFirstName("Pablo");
            user6.setLastName("Ledesma");
            user6.setEmail("pablo@gmail.com");
            user6.setPassword(passwordEncoder.encode("user6"));
            user6.setDni("1234567894");
            user6.setCredits(1000);
            user6.setRole(Role.USER);
            user6.setAge(34);
            user6.setActive(true);
            userRepository.save(user6);

            //User 7
            User user7 = new User();
            user7.setFirstName("Hans");
            user7.setLastName("Urpay");
            user7.setEmail("capogit@gmail.com");
            user7.setPassword(passwordEncoder.encode("user7"));
            user7.setDni("1234567895");
            user7.setCredits(1000);
            user7.setRole(Role.USER);
            user7.setAge(28);
            user7.setActive(true);
            userRepository.save(user7);

            //User 8
            User user8 = new User();
            user8.setFirstName("Matias");
            user8.setLastName("Acevedo");
            user8.setEmail("mati@gmail.com");
            user8.setPassword(passwordEncoder.encode("user8"));
            user8.setDni("1234567896");
            user8.setCredits(1000);
            user8.setRole(Role.USER);
            user8.setAge(30);
            user8.setActive(true);
            userRepository.save(user8);

            //User 9
            User user9 = new User();
            user9.setFirstName("Santiago");
            user9.setLastName("Figliuolo");
            user9.setEmail("santi@gmail.com");
            user9.setPassword(passwordEncoder.encode("user9"));
            user9.setDni("1234567897");
            user9.setCredits(1000);
            user9.setRole(Role.USER);
            user9.setAge(24);
            user9.setActive(true);
            userRepository.save(user9);

            //User 10
            User user10 = new User();
            user10.setFirstName("Angel");
            user10.setLastName("DiMaria");
            user10.setEmail("dimaria@gmail.com");
            user10.setPassword(passwordEncoder.encode("user10"));
            user10.setDni("1234567899");
            user10.setCredits(1000);
            user10.setRole(Role.USER);
            user10.setAge(35);
            user10.setActive(true);
            userRepository.save(user10);

            // Seccion de posts y comentarios
            //Post 1
            Post post1 = new Post();
            post1.setTitle("Historia de la ruleta: origen y evolución");
            post1.setDescription("Bienvenidos al post donde exploraremos la fascinante historia de la ruleta, desde sus humildes comienzos" +
                    " en el siglo XVII hasta su popularidad global en los casinos de hoy en día. Descubre cómo ha evolucionado" +
                    " este emocionante juego a lo largo de los siglos.");
            post1.setCreated_at(LocalDateTime.now());
            post1.setUpdated_at(LocalDateTime.now());
            post1.setUser(user1);
            postsRepository.save(post1);

            //Comentario 1
            Comment comment1 = new Comment();
            comment1.setComment("¡Increíble historia! No tenía idea de que la ruleta tuviera tanto tiempo de existencia.");
            comment1.setUser(user2);
            comment1.setPost(post1);
            comment1.setCreatedAt(LocalDateTime.now());
            comment1.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment1);

            //Comentario 2
            Comment comment2 = new Comment();
            comment2.setComment("Es sorprendente cómo un juego tan simple ha resistido la prueba del tiempo y sigue siendo tan popular.");
            comment2.setUser(user3);
            comment2.setPost(post1);
            comment2.setCreatedAt(LocalDateTime.now());
            comment2.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment2);

            //Comentario 3
            Comment comment3 = new Comment();
            comment3.setComment("¡Me encanta la ruleta! Aprecio mucho conocer más sobre su historia y desarrollo.");
            comment3.setUser(user4);
            comment3.setPost(post1);
            comment3.setCreatedAt(LocalDateTime.now());
            comment3.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment3);

            //Comentario 4
            Comment comment4 = new Comment();
            comment4.setComment("La ruleta realmente tiene una historia fascinante. Es interesante cómo ha cambiado a lo largo de los años.");
            comment4.setUser(user5);
            comment4.setPost(post1);
            comment4.setCreatedAt(LocalDateTime.now());
            comment4.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment4);

            //Post 2
            Post post2 = new Post();
            post2.setTitle("Los diferentes tipos de ruleta");
            post2.setDescription("Desde la ruleta europea hasta la ruleta americana y más allá, en este artículo exploramos los diferentes tipos de ruleta que" +
                    " puedes encontrar en los casinos. Descubre las diferencias clave entre cada variante y cómo afectan tus probabilidades de ganar.");
            post2.setCreated_at(LocalDateTime.now());
            post2.setUpdated_at(LocalDateTime.now());
            post2.setUser(user2);
            postsRepository.save(post2);

            //Comentario 5
            Comment comment5 = new Comment();
            comment5.setComment("¡Excelente resumen de los tipos de ruleta! Personalmente, prefiero la europea por su ventaja de la casa más baja.");
            comment5.setUser(user6);
            comment5.setPost(post2);
            comment5.setCreatedAt(LocalDateTime.now());
            comment5.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment5);

            //Comentario 6
            Comment comment6 = new Comment();
            comment6.setComment("La ruleta americana es una variante de la ruleta europea, pero tiene una gran diferencia en su funcionalidad.");
            comment6.setUser(user7);
            comment6.setPost(post2);
            comment6.setCreatedAt(LocalDateTime.now());
            comment6.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment6);

            //Comentario 7
            Comment comment7 = new Comment();
            comment7.setComment("¡Muy útil! No sabía que había tantas variaciones de ruleta diferentes.");
            comment7.setUser(user8);
            comment7.setPost(post2);
            comment7.setCreatedAt(LocalDateTime.now());
            comment7.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment7);

            //Comentario 8
            Comment comment8 = new Comment();
            comment8.setComment("¡Gracias por aclarar las diferencias entre las diferentes variantes de ruleta! Ahora entiendo mejor cuál es la mejor opción para mí.");
            comment8.setUser(user9);
            comment8.setPost(post2);
            comment8.setCreatedAt(LocalDateTime.now());
            comment8.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment8);

            //Post 3
            Post post3 = new Post();
            post3.setTitle("Cómo una aplicación cambió mi vida y me ayudó a superar mi adicción a la ruleta");
            post3.setDescription("En este post quiero compartir cómo una aplicación móvil específicamente diseñada para ayudar a las personas" +
                            " con adicción al juego cambió mi vida. Desde el seguimiento de mis hábitos de juego hasta la provisión de recursos y apoyo, " +
                            "esta aplicación se convirtió en una herramienta invaluable en mi viaje hacia la recuperación.");
            post3.setCreated_at(LocalDateTime.now());
            post3.setUpdated_at(LocalDateTime.now());
            post3.setUser(user3);
            postsRepository.save(post3);

            //Comentario 9
            Comment comment9 = new Comment();
            comment9.setComment("¡Qué testimonio inspirador! Es increíble ver cómo la tecnología puede ser utilizada para el bienestar y la recuperación.");
            comment9.setUser(user10);
            comment9.setPost(post3);
            comment9.setCreatedAt(LocalDateTime.now());
            comment9.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment9);

            //Comentario 10
            Comment comment10 = new Comment();
            comment10.setComment("Gracias por compartir tu experiencia. Es alentador saber que existen recursos como aplicaciones para ayudar a las personas en su viaje hacia la recuperación.");
            comment10.setUser(user1);
            comment10.setPost(post3);
            comment10.setCreatedAt(LocalDateTime.now());
            comment10.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment10);

            //Comentario 11
            Comment comment11 = new Comment();
            comment11.setComment("Tu historia demuestra el poder transformador de la tecnología cuando se usa para un propósito positivo. ¡Felicitaciones por tu progreso!");
            comment11.setUser(user2);
            comment11.setPost(post3);
            comment11.setCreatedAt(LocalDateTime.now());
            comment11.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment11);

            //Comentario 12
            Comment comment12 = new Comment();
            comment12.setComment("Es maravilloso ver cómo una aplicación pudo tener un impacto tan positivo en tu vida. Gracias por compartir tu historia de esperanza.");
            comment12.setUser(user4);
            comment12.setPost(post3);
            comment12.setCreatedAt(LocalDateTime.now());
            comment12.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment12);

            //Post 4
            Post post4 = new Post();
            post4.setTitle("Consejos para principiantes en la ruleta");
            post4.setDescription("Si eres nuevo en la ruleta, este artículo es para ti. Aquí encontrarás algunos consejos útiles para principiantes" +
                    " que te ayudarán a empezar a jugar y a disfrutar del juego de manera segura y divertida.");
            post4.setCreated_at(LocalDateTime.now());
            post4.setUpdated_at(LocalDateTime.now());
            post4.setUser(user4);
            postsRepository.save(post4);

            //Comment 13
            Comment comment13 = new Comment();
            comment13.setComment("¡Grandes consejos para principiantes! Definitivamente los tendré en cuenta la próxima vez que juegue.");
            comment13.setUser(user5);
            comment13.setPost(post4);
            comment13.setCreatedAt(LocalDateTime.now());
            comment13.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment13);

            //Comment 14
            Comment comment14 = new Comment();
            comment14.setComment("¡Me gustaría haber leído esto antes de mi primera vez en el casino! Muy útil para los nuevos jugadores.");
            comment14.setUser(user6);
            comment14.setPost(post4);
            comment14.setCreatedAt(LocalDateTime.now());
            comment14.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment14);

            //Comment 15
            Comment comment15 = new Comment();
            comment15.setComment("La gestión del bankroll es clave. Aprendí esa lección difícil después de perder más de lo que podía permitirme.");
            comment15.setUser(user7);
            comment15.setPost(post4);
            comment15.setCreatedAt(LocalDateTime.now());
            comment15.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment15);

            Comment comment16 = new Comment();
            comment16.setComment("¡Excelentes consejos! La ruleta puede ser intimidante para los principiantes, pero estos consejos hacen que sea más accesible.");
            comment16.setUser(user8);
            comment16.setPost(post4);
            comment16.setCreatedAt(LocalDateTime.now());
            comment16.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment16);

            //Post 5
            Post post5 = new Post();
            post5.setTitle("Mi viaje hacia la recuperación de la adicción a la ruleta");
            post5.setDescription("En este testimonio personal, comparto mi experiencia de lucha contra la adicción a la ruleta y cómo finalmente encontré" +
                                " el camino hacia la recuperación. Desde los altibajos emocionales hasta los pasos prácticos que tomé para superar mi " +
                                "adicción, esta es mi historia de esperanza y renovación.");
            post5.setCreated_at(LocalDateTime.now());
            post5.setUpdated_at(LocalDateTime.now());
            post5.setUser(user5);
            postsRepository.save(post5);

            //Comment 17
            Comment comment17 = new Comment();
            comment17.setComment("¡Gracias por compartir tu historia! Es inspirador ver cómo has superado tus luchas.");
            comment17.setUser(user9);
            comment17.setPost(post5);
            comment17.setCreatedAt(LocalDateTime.now());
            comment17.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment17);

            //Comment 18
            Comment comment18 = new Comment();
            comment18.setComment("Tu valentía al compartir tu historia es admirable. Espero que ayude a otros que están luchando.");
            comment18.setUser(user10);
            comment18.setPost(post5);
            comment18.setCreatedAt(LocalDateTime.now());
            comment18.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment18);

            //Comment 19
            Comment comment19 = new Comment();
            comment19.setComment("¡Increíble testimonio! Es alentador saber que es posible recuperarse de la adicción a la ruleta.");
            comment19.setUser(user1);
            comment19.setPost(post5);
            comment19.setCreatedAt(LocalDateTime.now());
            comment19.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment19);

            //Comment 20
            Comment comment20 = new Comment();
            comment20.setComment("Tu historia es conmovedora. Gracias por mostrarnos que la recuperación es posible.");
            comment20.setUser(user2);
            comment20.setPost(post5);
            comment20.setCreatedAt(LocalDateTime.now());
            comment20.setUpdatedAt(LocalDateTime.now());
            commentRepository.save(comment20);

        }

    }
}
