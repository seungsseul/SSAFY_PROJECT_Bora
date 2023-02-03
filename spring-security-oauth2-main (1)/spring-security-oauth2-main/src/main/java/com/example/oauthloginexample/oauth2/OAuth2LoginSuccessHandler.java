package com.example.oauthloginexample.oauth2;

import com.example.oauthloginexample.entity.User;
import com.example.oauthloginexample.jwt.JwtProvider;
import com.example.oauthloginexample.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    private final String redirectUrl = "http://localhost:3000/regist";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String accessToken = jwtProvider.createAccessToken(authentication);
        String refreshToken = jwtProvider.createRefreshToken(authentication);

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        saveOrUpdateUser(refreshToken, oAuth2User);

        ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                .httpOnly(true)
                .maxAge(JwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                .path("/")
                .build();

        clearAuthenticationAttributes(request, response);

        response.addHeader("Set-Cookie", cookie.toString());
        response.getWriter().write(accessToken);

        String targetUrl;
        targetUrl = UriComponentsBuilder.fromUriString(redirectUrl)
                .queryParam("atk", "Bearer " + accessToken)
                .build().toUriString();
        // 프론트 페이지로 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    private void saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {
        Optional<User> opt = userRepository.findByEmail(oAuth2User.getEmail());
        User user;

        if (opt.isEmpty()) {
            user = User.builder()
                    .email(oAuth2User.getEmail())
                    .nickname(oAuth2User.getNickname())
                    .refreshToken(refreshToken)
                    .build();
        } else {
            user = opt.get();
            user.updateRefreshToken(refreshToken);
        }

        userRepository.save(user);
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
    }
}