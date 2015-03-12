package com.techlooper.service.impl;

import com.techlooper.entity.userimport.UserImportEntity;
import com.techlooper.model.SocialProvider;
import com.techlooper.model.Talent;
import com.techlooper.service.TalentSearchDataProcessor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Created by NguyenDangKhoa on 3/11/15.
 */
@Service("GITHUBTalentSearchDataProcessor")
public class GithubTalentSearchDataProcessor implements TalentSearchDataProcessor {

    @Override
    public List<Talent> process(List<UserImportEntity> users) {
        return users.stream().map(userImportEntity -> {
            Map<String,Object> profile = (Map<String,Object>) userImportEntity.getProfiles().get(SocialProvider.GITHUB);

            if (profile == null) {
                return null;
            }

            Talent.Builder talentBuilder = new Talent.Builder();
            return talentBuilder.withEmail(userImportEntity.getEmail())
                             .withUsername(StringUtils.trimToEmpty((String) profile.get("username")))
                             .withFullName(StringUtils.trimToEmpty((String) userImportEntity.getFullName()))
                             .withImageUrl(StringUtils.trimToEmpty((String) profile.get("imageUrl")))
                             .withCompany(StringUtils.trimToEmpty((String) profile.get("company")))
                             .withDescription(StringUtils.trimToEmpty((String) profile.get("description")))
                             .withLocation(StringUtils.trimToEmpty((String) profile.get("location")))
                             .withJobTitle("")
                             .withSkills(((List<String>) profile.get("skills")))
                             .build();
        }).filter(talent -> talent != null).collect(Collectors.toList());
    }

}
