package com.example.oauthloginexample.config;

import com.example.oauthloginexample.jwt.JwtAccessDeniedHandler;
import com.example.oauthloginexample.jwt.JwtAuthenticationEntryPoint;
import com.example.oauthloginexample.jwt.JwtAuthenticationFilter;
import com.example.oauthloginexample.jwt.JwtProvider;
import com.example.oauthloginexample.oauth2.CustomOAuth2UserService;
import com.example.oauthloginexample.oauth2.OAuth2LoginSuccessHandler;
import com.example.oauthloginexample.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new OAuth2LoginSuccessHandler(userRepository, jwtProvider);
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeHttpRequests()
                // POST /users는 인증이 되어야 접근 가능
                .antMatchers(HttpMethod.POST, "/users").authenticated()
                // 그외 모든 요청은 허용
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/")
                .and()
                .oauth2Login()
                .successHandler(authenticationSuccessHandler())
                .userInfoEndpoint() // OAuth2 로그인 성공 이후 사용자 정보를 가져올 때 설정을 저장
                .userService(customOAuth2UserService); // OAuth2 로그인 성공 시, 후작업을 진행할 UserService 인터페이스 구현체 등록

        // jwt 사용을 위해 session 해제
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // jwt 필터 추가
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // jwt 인증 실패시 exception handler 등록
        http.exceptionHandling()
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .authenticationEntryPoint(jwtAuthenticationEntryPoint);

        return http.build();
    }
}
