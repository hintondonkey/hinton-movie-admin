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
        post_time,
        close_post_date,
        close_post_time,
        active,
        titleNoti,
        summaryNoti,
        category,
        stream_flatform_image,
        sub_icon,
        uid_sub_icon,
        is_horizontal,
        subcategory
    ) {
        this.watchlist = watchlist;
        this.title = title;
        this.description = description;
        this.show_date = show_date;
        this.time_show_date = time_show_date;
        this.close_date = close_date;
        this.time_close_date = time_close_date;
        this.post_date = post_date;
        this.post_time = post_time;
        this.close_post_date = close_post_date;
        this.close_post_time = close_post_time;
        this.active = active;
        this.titleNoti = titleNoti;
        this.summaryNoti = summaryNoti;
        this.category = category;
        this.stream_flatform_image = stream_flatform_image;
        this.sub_icon = sub_icon;
        this.uid_sub_icon = uid_sub_icon;
        this.is_horizontal = is_horizontal;
        this.subcategory = subcategory;
    }
}
