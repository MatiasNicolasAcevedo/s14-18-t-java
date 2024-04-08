package com.awaregaming.AwareGaming.model;

import com.awaregaming.AwareGaming.model.Enum.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;


@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUser;
    @NotEmpty(message = "El campo nombre no puede estar vacio")
    private String firstName;
    @NotEmpty(message = "El campo apellido no puede estar vacio")
    private String lastName;
    @Column(unique = true)
    @NotEmpty(message = "El campo email no puede estar vacio")
    @Email
    private String email;
    @NotEmpty(message = "El campo contraseña no puede estar vacio")
    private String password;
    @Column(unique = true)
    @NotEmpty(message = "El campo dni no puede estar vacio")
    private String dni;
    @NotNull(message = "El campo balance no puede estar vacio")
    private int credits;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean isActive;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of((new SimpleGrantedAuthority(role.name())));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
