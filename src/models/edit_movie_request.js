export class EditMovieRequest {
    constructor(
        watchlist,
        title,
        description,
        show_date,
        time_show_date,
        close_date,
        time_close_date,
        post_date,
        time_post_date,
        end_post_date,
        time_end_post_date,
        active,
        titleNoti,
        summaryNoti,
        category,
        stream_flatform_image,
        sub_icon,
        uid_sub_icon,
        is_horizontal
    ) {
        this.watchlist = watchlist;
        this.title = title;
        this.description = description;
        this.show_date = show_date;
        this.time_show_date = time_show_date;
        this.close_date = close_date;
        this.time_close_date = time_close_date;
        this.post_date = post_date;
        this.time_post_date = time_post_date;
        this.end_post_date = end_post_date;
        this.time_end_post_date = time_end_post_date;
        this.active = active;
        this.titleNoti = titleNoti;
        this.summaryNoti = summaryNoti;
        this.category = category;
        this.stream_flatform_image = stream_flatform_image;
        this.sub_icon = sub_icon;
        this.uid_sub_icon = uid_sub_icon;
        this.is_horizontal = is_horizontal;
    }
}
