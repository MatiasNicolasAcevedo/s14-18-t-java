package com.awaregaming.AwareGaming.utils;

import com.awaregaming.AwareGaming.model.Enum.Role;
import com.awaregaming.AwareGaming.model.Post;
import com.awaregaming.AwareGaming.model.User;
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

            userRepository.save(user1);

            Post post1 = new Post();
            post1.setTitle("Dejar el juego");
            post1.setDescription("Desde que deje el juego volvi a recuperar a mis hijos");
            post1.setCreated_at(LocalDateTime.now());
            post1.setUpdated_at(null);
            post1.setUser(user1);

            postsRepository.save(post1);

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

            userRepository.save(user3);

            Post post2 = new Post();
            post2.setTitle("Me siento una persona nueva");
            post2.setDescription("Desde que deje el volvi a sentirme lleno de vida, volvi a apreciar lo linda que es la vida");
            post2.setCreated_at(LocalDateTime.now());
            post2.setUpdated_at(null);
            post2.setUser(user3);

            postsRepository.save(post2);

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

            userRepository.save(user4);

            Post post4 = new Post();
            post4.setTitle("Una segunda oportunidad");
            post4.setDescription("Recupere a mi esposa luego de dejar el juego y fue lo mejor que me paso");
            post4.setCreated_at(LocalDateTime.now());
            post4.setUpdated_at(null);
            post4.setUser(user4);

            postsRepository.save(post4);

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

            userRepository.save(user5);

            Post post5 = new Post();
            post5.setTitle("Ahorro mas plata desde que deje el juego");
            post5.setDescription("Me di cuenta que el juego estaba llevandose todo mi salario y cosas materiales, desde que lo deje, pude ahorrar y comprarme un 0km");
            post5.setCreated_at(LocalDateTime.now());
            post5.setUpdated_at(null);
            post5.setUser(user5);

            postsRepository.save(post5);

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

            userRepository.save(user10);

        }

    }
}
