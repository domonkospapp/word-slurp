package com.dpapp.wordlearning.words

import com.dpapp.wordlearning.users.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface WordRepository extends JpaRepository<Word, Long> {
    boolean existsByOriginalAndForeign(String original, String foreign)

    List<WordProjection> findAllByUser(User user)

    @Query("""
        SELECT w FROM Word w
            WHERE w.user = :user 
            AND (w.originalLanguage = :ol OR :ol IS NULL)
            AND (w.foreignLanguage = :fl OR :fl IS NULL)
    """)
    List<WordProjection> findAll(@Param("user") User user, @Param("ol") String ol, @Param("fl") String fl)

    @Query(

            value = """
                SELECT DISTINCT on (original_language, foreign_language) * FROM word WHERE user_id = :userId
            """,
            nativeQuery = true
    )
    List<Word> findAllLanguages(@Param("userId") userId)
}